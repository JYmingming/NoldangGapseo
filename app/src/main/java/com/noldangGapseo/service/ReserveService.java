package com.noldangGapseo.service;

import java.awt.print.PrinterGraphics;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.json.Json;
import org.springframework.stereotype.Service;
import com.noldangGapseo.domain.Hotel;
import com.noldangGapseo.domain.ReserveResponse;

@Service
public class ReserveService {

  // WebDriver
  private WebDriver driver;
  private WebElement webElement;
  // Properties
  public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
  //  public static final String WEB_DRIVER_PATH = "C:\\chromedriver.exe";
  public static final String WEB_DRIVER_PATH = "/opt/homebrew/bin/chromedriver";
  //호텔 url 등록
  private String base_url;

  public void ReserveService() {
    System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);
  }


  public ReserveResponse driverStarter(String startDate, String endDate, String link) {
    ReserveService selTest = new ReserveService();

    // type 체크
    // type L == list가져오기
    // type O == 호텔가져오기
    ArrayList hotels;
    Object hotel;
    JSONArray oblist = new JSONArray();

    try {
      if (link.equals("L")) {
        hotels = selTest.listCrawl(startDate, endDate);
        selTest.driver.close();
        System.out.println("리스트 크롤링 정상종료");
        return ReserveResponse.builder().hotels(hotels).build();
      } else {
        //hotel = selTest.hotelCrawl(link,startDate,endDate);
        selTest.hotelCrawl(link,startDate,endDate);
        System.out.println("호텔 크롤링 정상종료");
        selTest.driver.close();
        //return ReserveResponse.builder().hotel(hotel).build();
        return null;
      }
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
      selTest.driver.close();
      System.out.println("예외로 인한 드라이버 종료");
    }
    //    selTest.infoCrawl();
    //      }

    return null;
  }

  //호텔 리스트를 크롤링하여 리스트 반환
  public ArrayList listCrawl(String startDate, String endDate) throws Exception {
    driver = new ChromeDriver();
    System.out.println("crawling start!!!!");
    ArrayList<ArrayList> hotels = new ArrayList<>(); // 호텔 여러개를 달는 배열 생성
    JSONArray objlist = new JSONArray(); // 호텔 여러개를 담는 추가된 JSONArray 코드

    //크롤링 할 url 등록
    base_url = "https://www.goodchoice.kr/product/result?sel_date=" + startDate + "&sel_date2=" + endDate + "&keyword=%EC%A0%9C%EC%A3%BC%EB%8F%84";
    //크롤링 해올 url 가져오기
    driver.get(base_url);
    sleep(2);
    // 이미지를 불러오기위한 사전 스크롤 행위
    JavascriptExecutor je = (JavascriptExecutor) driver;
    for (int i = 1; i < 50; i++) {
      je.executeScript("window.scrollTo(0, " + (i * 500) + ")");
      Thread.sleep(50);
    }

    //리스트 카운트 (반복 조절)
    int cnt = driver.findElements(By.cssSelector("#poduct_list_area > ul > li")).size();
    for (int i = 1; i < cnt; i++) {
      ArrayList<String> hotelOne = new ArrayList<>(); //호텔 하나의 정보들을 담는 배열 생성
      WebElement hotelScore;
      WebElement hotelName = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(" + i + ") > a > div > div.name > strong:not(div)"));
      try {
        hotelScore = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(" + i + ") > a > div > div.name > p.score > span > em"));
      } catch (Exception e) {
        hotelScore = driver.findElement(By.cssSelector("#poduct_list_area > ul > li:nth-child(1) > a > div > div.name > p.score > span > em"));
      }


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

      //반환 객체인 hotels에 반복적으로 hotel 한개의 데이터들을 담는 코드
      hotelOne.add(hotelScore.getText());
      hotelOne.add(hotelLocation.getText());
      hotelOne.add(hotelPrice.getText());
      hotelOne.add(hotelImg.getAttribute("src"));
      hotelOne.add(hotelUrl.getAttribute("data-ano"));
      hotels.add(hotelOne);


      //추가 코드
      JSONObject obj = new JSONObject();
      obj.put("hotelScore", hotelScore.getText());
      obj.put("hotelLocation", hotelLocation.getText());
      obj.put("hotelPrice", hotelPrice.getText());
      obj.put("hotelImg", hotelImg.getAttribute("src"));
      obj.put("hotelUrl", hotelUrl.getAttribute("data-ano"));
      objlist.add(obj);
    }

    System.out.println("objlist = " + objlist);
    try {
      FileWriter file = new FileWriter("./app/src/main/resources/static/asset/data/hotel.json");
      file.write(objlist.toJSONString());
      file.flush();
      file.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
    return hotels;
  }

  //호텔 정보를 크롤링하여 호텔객체 반환
  public void hotelCrawl(String hotel_url, String startDate, String endDate) throws Exception {
    driver = new ChromeDriver();
    Hotel hotel = new Hotel();
    String real_url = "https://www.goodchoice.kr/product/detail?ano=" + hotel_url + "&adcno=2&sel_date=" + startDate + "&sel_date2=" + endDate;
    System.out.println("crawling start");
    //크롤링 해올 단일 url 가져오기
    driver.get(real_url);
    sleep(2);

    /*데이터 추출 구간*/
    WebElement hotelName = driver.findElement(By.cssSelector("#content > div.top > div.right > div.info > h2"));
    WebElement hotelLocation = driver.findElement(By.cssSelector("#content > div.top > div.right > div.info > p.address"));
    WebElement hotelComment = driver.findElement(By.cssSelector("#content > div.top > div.right > div.comment > div"));
    WebElement hotelPrice = driver.findElement(By.xpath("//*[@id=\"product_filter_form\"]/article/div[2]/div[3]/div/div/div/p[2]/b"));

    //데이터 변환 및 도메인에 add  ex) 20,000원 -> 20000
    String strPrice = hotelPrice.getText()
            .replace(",", "")
            .replace("원", "")
            .replace(" ", "")
            .replace("/", "")
            .replace("1박", "")
            .replace("2박", "");

    //이미지 개수를 세어 직접 로딩해줌
    int imgCnt = driver.findElements(By.cssSelector("#content > div.top > div.left > div.gallery_pc > div.swiper-container.gallery-thumbs.swiper-container-horizontal > ul > li")).size();
    for (int i = 0; i < imgCnt; i++) {
      driver.findElement(By.xpath("//*[@id=\"content\"]/div[1]/div[1]/div[2]/div[4]")).click();
      Thread.sleep(175);
    }

    //숙소 이미지 수집
    List<WebElement> hotelImg = driver.findElements(By.cssSelector("#content > div.top > div.left > div.gallery_pc > div.swiper-container.gallery-thumbs.swiper-container-horizontal > ul > li > img"));
    ArrayList<String> imgArray = new ArrayList<>();
    for (WebElement item : hotelImg) {
      imgArray.add(item.getAttribute("src"));
    }

    //호텔 도메인 데이터셋
    //return hotel;
  }


  public JSONArray hotelCrawlModel(String startDate,String endDate) throws Exception{

    JSONParser parser = new JSONParser();

    Reader reader = new FileReader("./app/src/main/resources/static/asset/data/hotel.json");
    //reader로 읽은 데이터를 JSONpaser가 제공하는 parse함수를 통해 JSONObject로 만들어준다.
    JSONArray jsonArray = (JSONArray) parser.parse(reader);
    listCrawl(jsonArray,startDate,endDate);
    return jsonArray;
  }

  public void listCrawl(JSONArray hotels,String startDate,String endDate) throws Exception {

    driver = new ChromeDriver();
    JSONArray hotellist = new JSONArray(); // 호텔디테일 정보들을 담는 리스트 생성
    int exceptionCnt =0;

    for (int i = 0; i < hotels.toArray().length; i++) {
      try{
        JSONObject hotel = (JSONObject) hotels.get(i);
        System.out.println(hotel.get("hotelUrl"));
        String real_url = "https://www.goodchoice.kr/product/detail?ano=" + hotel.get("hotelUrl") + "&adcno=2&sel_date=" + startDate + "&sel_date2=" + endDate;
        driver.get(real_url);
        sleep(2);

        /*데이터 추출 구간*/
        WebElement hotelName = driver.findElement(By.cssSelector("#content > div.top > div.right > div.info > h2"));
        WebElement hotelLocation = driver.findElement(By.cssSelector("#content > div.top > div.right > div.info > p.address"));
        WebElement hotelComment = driver.findElement(By.cssSelector("#content > div.top > div.right > div.comment > div"));
        WebElement hotelPrice = driver.findElement(By.xpath("//*[@id=\"product_filter_form\"]/article/div[2]/div[3]/div/div/div/p[2]/b"));

        //데이터 변환 및 도메인에 add  ex) 20,000원 -> 20000
        String strPrice = hotelPrice.getText()
                .replace(",", "")
                .replace("원", "")
                .replace(" ", "")
                .replace("/", "")
                .replace("1박", "")
                .replace("2박", "");

        //이미지 개수를 세어 직접 로딩해줌
        int imgCnt = driver.findElements(By.cssSelector("#content > div.top > div.left > div.gallery_pc > div.swiper-container.gallery-thumbs.swiper-container-horizontal > ul > li")).size();
        for (int j = 0; j < imgCnt; j++) {
          driver.findElement(By.xpath("//*[@id=\"content\"]/div[1]/div[1]/div[2]/div[4]")).click();
          Thread.sleep(175);
        }

        //숙소 이미지 수집
        List<WebElement> hotelImg = driver.findElements(By.cssSelector("#content > div.top > div.left > div.gallery_pc > div.swiper-container.gallery-thumbs.swiper-container-horizontal > ul > li > img"));
        ArrayList<String> imgArray = new ArrayList<>();
        for (WebElement item : hotelImg) {
          imgArray.add(item.getAttribute("src"));
        }
        JSONObject obj = new JSONObject();
        obj.put("hotelName", hotelName.getText());
        obj.put("hotelLocation", hotelLocation.getText());
        obj.put("hotelComment", hotelComment.getText());
        obj.put("setHotelPrice", Integer.parseInt(strPrice));
        obj.put("ImgUrl", imgArray);
        hotellist.add(obj);
      }catch (Exception e){
        exceptionCnt++;
        continue;
      }
    }// end for
    // 크롤링한 hotel data를 날짜를 기준으로 json 데이터로 저장
    try {
      FileWriter file = new FileWriter("./app/src/main/resources/static/asset/data/"+startDate+"_"+endDate+".json");
      file.write(hotellist.toJSONString());
      file.flush();
      file.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
    driver.close();
    System.out.println("exceptionCnt = " + exceptionCnt);
  }


  //셀레니움 대기 메소드
  private void sleep(int sec) {
    try {
      Thread.sleep(sec * 1000);
    } catch (InterruptedException e) {
      e.printStackTrace(); //exception이 몇번났는지 카운트 출력
    }
  }
}

  //클릭이벤트 , 맵 이용하여 사진 url 반환


