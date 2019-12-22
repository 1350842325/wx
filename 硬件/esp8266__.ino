
#include <cJSON.h>
#include <stdio.h>
#include <stdlib.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

const char* ssid = "vivo";      // wifi名
const char* password = "25802580";  // wifi密码

const char* host = "api.heclouds.com";  // 连接的主机域名
const int httpsPort = 80;  // https端口
String url = "";  // 请求的页面地址(后面代码中进行拼接)

String API_KEY = "ZnAmtgUDSRR=WJExmOlyomR4yJc=";  // onenet的 api key
String deviceId = "576315018";    // onenet的设备ID
String dataId1 = "状态";    // 任意设置的数据名
String dataId2 = "wx";
String dataId3 = "指令";

void connectWifi();
int getDataToOnenet();
void postDataToOnenet1(String data1);
void postDataToOnenet2(String data2);
char data2;

void setup() {
  Serial.begin(115200);
  connectWifi();
}

void loop() {
  int data = getDataToOnenet();
  // Serial.println("GET data:");
  //   Serial.println(data);  
     for(int i=0;i<2;i++){
     if(Serial.available()){
    data2=Serial.read();
    if(data2=='a'){
    postDataToOnenet2("405");
    }
    else if(data2=='T')
      postDataToOnenet1("1");
    else if(data2=='F')
      postDataToOnenet1("0");
  }
    };
  delay(1000);
  }

/**
 * 连接wifi
 */
void connectWifi(){
  Serial.println();
  Serial.print("connecting to ");
  Serial.println(ssid);
  
  WiFi.mode(WIFI_STA);    // 设置wifi模式
  WiFi.begin(ssid, password);   // 连接wifi
  while (WiFi.status() != WL_CONNECTED) { //判断连接状态
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

/**
 * 从onenet获取数据
 */
int getDataToOnenet(){
  //Use WiFiClientSecure class to create TLS connection
  WiFiClient client;          // HTTP
  //WiFiClientSecure client;    // HTTPS
  //Serial.print("connecting to ");
  //Serial.println(host);
  if (!client.connect(host, httpsPort)) {   // 判断连接情况
    Serial.println("连接失败");
    return -1;
  }

  // 发送GET请求
  // 组拼url地址
  url = "/devices/" + deviceId + "/datastreams/" + dataId2;
  // 组拼HTTPS请求的Header
  String getStr = String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: arduino\r\n" +
               "api-key:" + API_KEY + "\r\n" +
               "Connection: close\r\n\r\n";
  client.print(getStr);

  // 读取连接情况
  while (client.connected()) {
    String line = client.readStringUntil('\n');
    if (line == "\r") {
      //Serial.println("headers received");
      break;
    }
  }

  // 读取数据
  String line = client.readStringUntil('\n');
  //Serial.println("get:");
  //Serial.println(line);   // 打印接受到的数据
  //Serial.println("closing connection");
  //const char*line2=(const char*)line;
  cJSON *pJsonRoot = cJSON_Parse(line.c_str());
  if (pJsonRoot !=NULL)
{
    //Serial.println("是json");
}
char strCurrent_value[2] = {0};
cJSON *pData = cJSON_GetObjectItem(pJsonRoot, "data");      // 解析data字段内容
if (!pData) return 0;                                          // 判断data字段是否json格式
else
{
    cJSON *pCurrent_value = cJSON_GetObjectItem(pData, "current_value");         // 解析子节点pData的create_time字段字符串内容
    if (!pCurrent_value) return 0;                                        // 判断create_time字段是否json格式
    else
    {

                strcpy(strCurrent_value, pCurrent_value->valuestring);                // 拷贝内容到字符串数组
                //Serial.println("时间为：");
                Serial.println(strCurrent_value);

    }
}

  return 0;
}
/**
 * 上传数据到onenet
 */
 //esp状态
void postDataToOnenet1(String data1){
  //Use WiFiClientSecure class to create TLS connection
  WiFiClient client;          // HTTP
  //WiFiClientSecure client;    // HTTPS
  //Serial.print("connecting to ");
  //Serial.println(host);
  if (!client.connect(host, httpsPort)) {   // 判断连接情况
    Serial.println("连接失败");
    return;
  }

  // 发送POST请求
  // 组拼url地址
  url = "/devices/" + deviceId + "/datapoints";
  // 组拼HTTPS请求的Header
  String jsonStr = String("") + "{'datastreams':[{" +
            "'id':'" + dataId1 + "'" +
            ",'datapoints':[{" +
            "'value':" + data1 +
            "}]}]}";
  String getStr = String("POST ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: arduino\r\n" +
               "api-key:" + API_KEY + "\r\n" +
               "Connection: close\r\n";
  client.print(getStr);   // 发送Headers头
  client.print(String("") + "Content-Length:" + jsonStr.length() + "\r\n\r\n"); // 发送Header头-数据内容长度(注意:\r\n\r\n是结尾)
  client.print(jsonStr);  // 发送json数据
  //Serial.println("send:");
  //Serial.println(jsonStr);   // 打印发送的请求数据
  String line = client.readStringUntil('\n');
  //Serial.println("reply was:");
  //Serial.println(line);   // 打印接受到的数据
}

//esp指令函数
void postDataToOnenet2(String data2){
  //Use WiFiClientSecure class to create TLS connection
  WiFiClient client;          // HTTP
  //WiFiClientSecure client;    // HTTPS
  //Serial.print("connecting to ");
  //Serial.println(host);
  if (!client.connect(host, httpsPort)) {   // 判断连接情况
    Serial.println("连接失败");
    return;
  }

  // 发送POST请求
  // 组拼url地址
  url = "/devices/" + deviceId + "/datapoints";
  // 组拼HTTPS请求的Header
  String jsonStr = String("") + "{'datastreams':[{" +
            "'id':'" + dataId3 + "'" +
            ",'datapoints':[{" +
            "'value':" + data2 +
            "}]}]}";
  String getStr = String("POST ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: arduino\r\n" +
               "api-key:" + API_KEY + "\r\n" +
               "Connection: close\r\n";
  client.print(getStr);   // 发送Headers头
  client.print(String("") + "Content-Length:" + jsonStr.length() + "\r\n\r\n"); // 发送Header头-数据内容长度(注意:\r\n\r\n是结尾)
  client.print(jsonStr);  // 发送json数据
  //Serial.println("send:");
  //Serial.println(jsonStr);   // 打印发送的请求数据
  String line = client.readStringUntil('\n');
  //Serial.println("reply was:");
  //Serial.println(line);   // 打印接受到的数据
}
