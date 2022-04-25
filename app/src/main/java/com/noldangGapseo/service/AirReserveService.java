package com.noldangGapseo.service;

import com.noldangGapseo.domain.Air;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.Map;

public class AirReserveService {
    private static WebDriver driver;
    private static WebElement webElement;
    private static String base_url;

    // Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    //  public static final String WEB_DRIVER_PATH = "C:\\chromedriver.exe";
    public static final String WEB_DRIVER_PATH = "/opt/homebrew/bin/chromedriver";



    public static void main(String[] args){
        try {
            System.out.println("try");
            airCrawl();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    /*param - String startDate, String endDate*/
    public static ArrayList airCrawl() throws Exception {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);
        System.out.println("시작");
        driver = new ChromeDriver();
        System.out.println("crawling start!!!!");


        //크롤링 할 url 등록
        /*base_url = "https://flight.naver.com/flights/domestic/GMP-CJU-"+startDate.replace("-","")+"/CJU-GMP-"+startDate.replace("-","")+"?adult=1&fareType=YC";*/
         base_url = "https://flight.naver.com/flights/domestic/GMP-CJU-20220427/CJU-GMP-20220528?adult=1&fareType=YC";

        //크롤링 해올 url 가져오기

        driver.get(base_url);
        sleep(12);


        //리스트 카운트 (반복 조절)


        int cnt = driver.findElements(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div")).size();
        System.out.println("cnt = " + cnt);
        for (int i = 1; i < cnt; i++) {
            Air air = new Air();
            air.setAirType(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.heading > div.airline > b")).getText());
            System.out.println(air.getAirType());
        }

        driver.close();
        return null;
    }

    //셀레니움 대기 메소드
    private static void sleep(int sec) {
        try {
            Thread.sleep(sec * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
