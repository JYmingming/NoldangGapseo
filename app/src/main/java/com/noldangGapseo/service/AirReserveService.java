package com.noldangGapseo.service;

import com.noldangGapseo.domain.Air;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AirReserveService {
    private static WebDriver driver;
    private static WebElement webElement;
    private static String base_url;

    // Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    //  public static final String WEB_DRIVER_PATH = "C:\\chromedriver.exe";
    public static final String WEB_DRIVER_PATH = "/opt/homebrew/bin/chromedriver";


    public static List<Air> airCrawl(String startDate, String endDate,String startLocation) throws Exception {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);
        System.out.println("시작");
        driver = new ChromeDriver();
        System.out.println("crawling start!!!!");
        List<Air> airs =new ArrayList<>();
        String locationCode = "";
        locationCode = locationTrans(startLocation);
        System.out.println("locationCode = " + locationCode);

        //크롤링 할 url 등록
         base_url = "https://flight.naver.com/flights/domestic/"+locationCode+"-CJU-"+startDate.replace("-","")+"/CJU-"+locationCode+"-"+endDate.replace("-","")+"?adult=1&fareType=YC";
         /*base_url = "https://flight.naver.com/flights/domestic/GMP-CJU-20220427/CJU-GMP-20220528?adult=1&fareType=YC";*/

        //크롤링 해올 url 가져오기

        driver.get(base_url);
        sleep(12);


        //리스트 카운트 (반복 조절)


        int cnt = driver.findElements(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div")).size();
        System.out.println("cnt = " + cnt);
        for (int i = 1; i < cnt; i++) {
            Air air = new Air();
            air.setAirType(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.heading > div.airline > b")).getText());
            air.setAirUrl(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.heading > div.airline > img")).getAttribute("src"));
            air.setAirStartTime(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.route_Route__2UInh > span:nth-child(1) > b")).getText());
            air.setAirEndTime(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.route_Route__2UInh > span:nth-child(2) > b")).getText());
            air.setAirPrice(Integer.parseInt((driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_prices__3N88F > div.domestic_item__2B--k > b > i")).getText()).replace(",","")));
            air.setAirFlag(1);
            airs.add(air);
        }

        driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[4]/div/div[2]/div[2]/div/button")).click();
        sleep(2);

        int cnt2 = driver.findElements(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div")).size();
        for (int i = 1; i < cnt; i++) {
            Air air = new Air();
            air.setAirType(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.heading > div.airline > b")).getText());
            air.setAirUrl(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.heading > div.airline > img")).getAttribute("src"));
            air.setAirStartTime(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.route_Route__2UInh > span:nth-child(1) > b")).getText());
            air.setAirEndTime(driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_schedule__1Whiq > div > div.route_Route__2UInh > span:nth-child(2) > b")).getText());
            air.setAirPrice(Integer.parseInt((driver.findElement(By.cssSelector("#__next > div > div.container > div.domestic_content__29ZnH > div > div.domestic_results__yNAgI > div:nth-child("+(i+1)+") > div > div.domestic_prices__3N88F > div.domestic_item__2B--k > b > i")).getText()).replace(",","")));
            air.setAirFlag(0);
            airs.add(air);
        }


        System.out.println(airs);


        driver.close();
        return airs;
    }

    //셀레니움 대기 메소드
    private static void sleep(int sec) {
        try {
            Thread.sleep(sec * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    private static String locationTrans(String loc) {
        String locationTransCode = "";
        if(loc.equals("서울")){
            locationTransCode = "SEL";
        }else if(loc.equals("부산")){
            locationTransCode = "PUS";
        }else if(loc.equals("김포")){
            locationTransCode = "GMP";
        }
        return locationTransCode;
    }

}
