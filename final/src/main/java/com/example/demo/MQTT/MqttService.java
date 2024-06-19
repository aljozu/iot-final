package com.example.demo.MQTT;

import com.example.demo.model.SensorData;
import com.example.demo.model.SensorDataRepository;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MqttService {
    private static final String TOPIC = "sensor/distance";

    @Autowired
    private MqttClient mqttClient;

    @Autowired
    private SensorDataRepository sensorDataRepository;

    @PostConstruct
    public void subscribeToTopic() throws MqttException{
        mqttClient.setCallback(new MqttCallback() {
            @Override
            public void connectionLost(Throwable throwable) {
                System.out.println("Connection lost: " + throwable.getMessage());
            }

            @Override
            public void messageArrived(String s, MqttMessage mqttMessage) throws Exception {
                System.out.println("Message arrived. Topic: " + s + " Message: " + new String(mqttMessage.getPayload()));
                SensorData sensorData = new SensorData();
                sensorData.setTopic(TOPIC);
                sensorData.setMessage(new String(mqttMessage.getPayload()));
                sensorDataRepository.save(sensorData);
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

            }
        });
        mqttClient.subscribe(TOPIC);
        System.out.println("Subscribed to topic: " + TOPIC);
    }
}
