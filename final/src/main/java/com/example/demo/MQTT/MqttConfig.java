package com.example.demo.MQTT;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {
    //.\mosquitto.exe -c "C:\Program Files\mosquitto\mosquitto.conf" -v
    // mosquitto_pub -h 192.168.1.42 -t sensor/distance -m "Hello, world!"
    // mosquitto_sub -h 192.168.1.42 -t sensor/distance
    @Value("${mqtt.broker.url}")
    private String BROKER_URL;

    @Value("${mqtt.client.id}")
    private String CLIENT_ID;

    @Bean
    public MqttClient mqttClient() throws MqttException{
        MqttClient mqttClient = new MqttClient(BROKER_URL, CLIENT_ID, new MemoryPersistence());
        mqttClient.connect();
        return mqttClient;
    }
}
