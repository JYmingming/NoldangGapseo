package com.noldangGapseo.service;

import com.noldangGapseo.domain.Hotel;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReserveService {

    Hotel hotel = new Hotel();

    public static void main(String[] args){


        System.out.println("main 메소드 실행???");
        //페이지마다 크롤링을 하기위한 for문
        //      for(int i=1; i<2; i++) {
        ReserveService selTest = new ReserveService();

        try {
            //리스트 크롤링
            //selTest.listCrawl();
            //단일 크롤링
            selTest.hotelCrawl("67563","2022-04-21","2022-04-22");


            selTest.driver.close();
            System.out.println("정상작동 드라이버 종료");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            selTest.driver.close();
            System.out.println("예외로 인한 드라이버 종료");
        }
        //    selTest.infoCrawl();
        //      }

    }

    // WebDriver
    private WebDriver driver;
    private WebElement webElement;

    // Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    //  public static final String WEB_DRIVER_PATH = "C:\\chromedriver.exe";
    public static final String WEB_DRIVER_PATH = "/opt/homebrew/bin/chromedriver";

    //호텔 url 등록
    private String base_url;

    //int값을 넘겨받아서 한페이지 한페이지 크롤링을 할수있음
    public ReserveService() {

        // System Property SetUp
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        //크롬 드라이버 객체 생성
        driver = new ChromeDriver();



    }

    //호텔 리스트를 크롤링하여 리스트 반환
    public Map<Integer,String> listCrawl() throws Exception {
        System.out.println("crawling start!!!!");

        //크롤링 할 url 등록
        base_url = "https://www.goodchoice.kr/product/result?sel_date=2022-04-21&sel_date2=2022-04-22&keyword=%EC%A0%9C%EC%A3%BC%EB%8F%84";
        //크롤링 해올 url 가져오기
        driver.get(base_url);
        sleep(2);
        ArrayList<ArrayList> hotels = new ArrayList<>(); // 호텔 여러개를 달는 배열 생성

        // 이미지를 불러오기위한 사전 스크롤 행위
        JavascriptExecutor je = (JavascriptExecutor) driver;
        for (int i = 1; i < 50; i++) {
            je.executeScript("window.scrollTo(0, " + (i * 500) + ")");
            Thread.sleep(25);
        }

        //리스트 카운트 (반복 조절)
        int cnt = driver.findElements(By.cssSelector("#poduct_list_area > ul > li")).size();
        for (int i = 1; i < cnt; i++) {
            ArrayList<String> hotelOne = new ArrayList<>(); //호텔 하나의 정보들을 담는 배열 생성
            WebElement hotelName = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(" + i + ") > a > div > div.name > strong:not(div)"));
            WebElement hotelScore = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(" + i + ") > a > div > div.name > p.score > span > em"));
            WebElement hotelLocation = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(" + i + ") > a > div > div.name > p:nth-child(3)"));
            WebElement hotelPrice = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(" + i + ") > a > div > div.price > p > b"));
            WebElement hotelImg = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(" + i + ") > a > p > img"));
            WebElement hotelUrl = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(" + i + ") > a "));

            // 등급이 있을경우 호텔이름이 2번째에 위치해서 잘라줌
            String[] spt = hotelName.getText().split("\n");
            if (1 == spt.length) {
                hotelOne.add(spt[0]);
            } else {
                hotelOne.add(spt[1]);
            }
            hotelOne.add(hotelScore.getText());
            hotelOne.add(hotelLocation.getText());
            hotelOne.add(hotelPrice.getText());
            hotelOne.add(hotelImg.getAttribute("src"));
            hotelOne.add(hotelUrl.getAttribute("data-ano"));
            hotels.add(hotelOne);

        }
        //데이터 확인 - 전체출력
        for (int i = 0; i < hotels.size(); i++) {
            //Debug - 호텔 1개의 정보를 전부 출력
            System.out.println(i + "번째 루프");
            for (int j = 0; j < hotels.get(i).size(); j++) {
                System.out.println("호텔 정보 : " + hotels.get(i).get(j));
            }
        }
            return null;
    }

    //클릭이벤트 , 맵 이용하여 사진 url 반환
    public Map<Integer, String> imgCrawl () throws Exception {

            System.out.println("img crawling start!!!!");

            //크롤링 해올 url 가져오기
            driver.get(base_url);   // 호텔 링크 자체로 수정 예정
            sleep(2);
            // 호텔 클릭 이벤트
            driver.findElement(By.xpath("//*[@id=\"__next\"]/div[1]/main/div/div[3]/div[1]/div/div/div/div[1]/div[1]/div/div/a")).click();


            //selenium에 제공되는 By Class를 이용하여 CssSeletor로 Css접근
            By picture = By.cssSelector("#__next > main > div.StyleComponent_container__1jS9A._place_no__container__1FhXY > div:nth-child(3) > section > div:nth-child(1) > div > div > li");

            //seletor로 접근한 tag를 webElement형태로 list에 저장.
            List<WebElement> pictures = driver.findElements(picture);
            //wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(picture)); // 화면 로딩시간을 기다려주는 메소드


            //디버깅
            System.out.println("pictures ==>" + pictures);
            System.out.println("pictures 디버깅 ==>" + pictures.size());
            //크롤링해온 값을 넣을 map생성.
            Map<Integer, String> urlMap = new HashMap<Integer, String>();
            webElement = driver.findElement(picture);
            for (int i = 0; i < pictures.size(); i++) {
                //WebElement에 있는 getAttribute 메서드를 사용하기위해 cssSelector로 selct해온 태그를 대입
                WebElement pic = pictures.get(i);

                //이미지가 저장되있는 src태그와, alt태그에 값을 String 값으로 넣기
                String url = pic.getAttribute("style");

                //각 이미지에 주소와 속성을 디버깅
                System.out.println("url 디버깅 ==>" + url);

                //크롤링해서 가져오는 data값에 확장자 (.gif)파일은 우리정보에 필요없는 일러스트 파일임 이 정보를 빼고 맵에 담기위한 if문
                if (url.contains("blank.gif")) {
                } else {
                    urlMap.put(i, url);
                }
            }
            //디버깅용
            System.out.println("urlMap==>" + urlMap);
            return null;


    }
    //셀레니움 대기 메소드
    private void sleep(int sec) {
        try {
            Thread.sleep(sec * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    public Map<Integer,String> hotelCrawl(String hotel_url,String startDate,String endDate) throws Exception {

        String real_url = "https://www.goodchoice.kr/product/detail?ano="+hotel_url+"&adcno=2&sel_date="+startDate+"&sel_date2="+endDate;


        System.out.println("crawling start");
        //크롤링 해올 단일 url 가져오기
        driver.get(real_url);
        sleep(2);

        ArrayList<ArrayList> hotelData = new ArrayList<>(); // 호텔정보 달는 배열 생성

        WebElement hotelName = driver.findElement(By.cssSelector("#content > div.top > div.right > div.info > h2"));
        System.out.println(hotelName.getText());
        WebElement hotelPrice = driver.findElement(By.cssSelector("#product_filter_form > article > div:nth-child(2) > div.info > div > div > div > p:nth-child(2) > b"));
        System.out.println(hotelPrice.getText());
        WebElement hotelLocation = driver.findElement(By.cssSelector("#content > div.top > div.right > div.info > p.address"));
        System.out.println(hotelLocation.getText());
        //
        List<WebElement> hotelImg = driver.findElements(By.cssSelector("#content > div.top > div.left > div.gallery_m.index_mobile > div > ul > li.swiper-slide > img"));

        for (WebElement item: hotelImg) {
            System.out.println(item.getAttribute("src"));
        }


        return null;
    }



}

