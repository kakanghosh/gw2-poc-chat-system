import { useState, useEffect } from 'react';
import { Kingdom, UseFetchState, User } from '@/app/models';

function useFetchUsersInKingdoms(kingdoms: Kingdom[]): UseFetchState<User[]> {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls: string[] = kingdoms.map(
          (kingdom) =>
            `http://localhost:8080/api/v1/users/kingdoms/${kingdom.id}`
        );
        const results = await Promise.all(
          urls.map(async (url) => await fetch(url))
        );
        const mappedUsers: User[] = [];
        for (let i = 0; i < results.length; i++) {
          const { users }: { users: User[] } = await results[i].json();
          mappedUsers.push(
            ...users.map(
              (user) =>
                new User(
                  kingdoms[i],
                  user.id,
                  user.firstName,
                  user.lastName,
                  user.onlineStatus
                )
            )
          );
        }
        mappedUsers.sort((a, b) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });
        setData(mappedUsers);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kingdoms]);

  return { data, loading, error };
}

export default useFetchUsersInKingdoms;
