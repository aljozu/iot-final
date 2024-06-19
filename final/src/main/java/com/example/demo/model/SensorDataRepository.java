package com.example.demo.model;

import com.example.demo.DTO.HourlyEntryCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SensorDataRepository extends JpaRepository<SensorData, Long> {

    @Query("SELECT new com.example.demo.DTO.HourlyEntryCount(EXTRACT(HOUR FROM sd.timestamp), COUNT(sd)) " +
            "FROM SensorData sd " +
            "WHERE sd.timestamp BETWEEN :startOfDay AND :endOfDay " +
            "GROUP BY EXTRACT(HOUR FROM sd.timestamp) " +
            "ORDER BY EXTRACT(HOUR FROM sd.timestamp)")
    List<HourlyEntryCount> countEntriesPerHour(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}
