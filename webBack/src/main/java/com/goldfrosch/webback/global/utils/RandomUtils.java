package com.goldfrosch.webback.global.utils;

import java.util.Random;

public class RandomUtils {
    private int firstLimit = 48;
    private int finalLimit = 122;

    private int targetStringLength = 12;

    public String GenerateNewPassword() {
        Random random = new Random();

        String randomString = random.ints(firstLimit, finalLimit + 1)
            .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
            .limit(targetStringLength)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();

        return randomString;
    }
}
