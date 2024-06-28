package com.genweb2.emb.exception.handler;

import com.genweb2.emb.exception.InvalidLimitException;
import com.genweb2.emb.exception.InvalidPageNumberException;
import com.genweb2.emb.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice(annotations = RestController.class)
@Slf4j
public class RestExceptionHandler {

    @ExceptionHandler(InvalidLimitException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleException(InvalidLimitException exception) {
        var errorResponse = new ErrorResponse(exception.getMessage(), InvalidLimitException.class.getSimpleName());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(errorResponse);
    }

    @ExceptionHandler(InvalidPageNumberException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleException(InvalidPageNumberException exception) {
        var errorResponse = new ErrorResponse(exception.getMessage(), exception.getClass().getSimpleName());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(errorResponse);
    }
}
