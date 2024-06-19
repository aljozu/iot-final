package com.example.demo.model;

import com.example.demo.DTO.HourlyEntryCount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/sensordata")
public class SensorDataController {

    @Autowired
    private SensorDataRepository sensorDataRepository;

    @GetMapping
    public List<SensorData> getAllSensorData(){
        return sensorDataRepository.findAll();
    }

    //http://localhost:8080/api/sensordata/count-per-hour?date=2024-06-19
    @GetMapping("/count-per-hour")
    public List<HourlyEntryCount> getCountPerHour(@RequestParam("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        LocalDateTime startOfDay = localDate.atStartOfDay();
        LocalDateTime endOfDay = localDate.atTime(LocalTime.MAX);

        return sensorDataRepository.countEntriesPerHour(startOfDay, endOfDay);
    }
}
