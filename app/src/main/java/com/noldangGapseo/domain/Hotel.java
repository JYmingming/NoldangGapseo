package com.noldangGapseo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Hotel {
    String hotelName; // ok
    Integer hotelPrice; // ok
    String hotelLocation; // ok
    String hotelComment; // ok
    ArrayList<String> imgUrl; // ok

}
