package com.goldfrosch.webback.global.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Slf4j
public class FileUpload {
    public static String uploadImage(MultipartFile file, String location){
        final String path =  "C:/Users/user/Documents/GitHub/MoaWebProject/webBack/src/main/file";

        File newFile = new File(path+location);

        //지정된 곳에 디렉터리가 없을경우에
        if(!newFile.isDirectory()){
            //디렉토리를 새로 만들어냅니다
            newFile.mkdirs();
        }
        try{
            file.transferTo(newFile);
            return path + location;
        }catch(Exception e){
            log.info(String.valueOf(e));
            return "";
        }
    }
}
