double t1=0,t2=0,t0=0;
int s_pin =A0;
int ch=0,k=0,kn=1,km=1;
long int tp;
String com="";
void setup()
{
Serial.begin(115200);
pinMode(s_pin,INPUT);
t1=millis();
};
void loop(){
  t1=millis();
  if(Serial.available()>0&&analogRead(s_pin)>100)
  {
    while(Serial.available()>0)
   com+=char(Serial.read());
     tp=com.toInt();
   Serial.println(tp);
   tp=tp*60*1000;
   Serial.println(tp); 
   t1=millis();
   t0=t1;
   for(int i=0;;i++){
 if(analogRead(s_pin)<100&&k==1){
 Serial.println("F");
for(ch;;ch++)
{
if(analogRead(s_pin)>100)break;
if(kn==50)
{
  Serial.println("F");
  kn=1;
  }
kn++;
delay(100);
}
if(ch>=49)
t1=millis();
else if(ch<=49)
t1=t0;
k=0;
}

else if(analogRead(s_pin)<100&&k==0){
int ch1=0;
Serial.println("F");
for(ch1;;ch1++)
{
 if(analogRead(s_pin)>100)break;
 if(km==50)
{
  Serial.println("F");
  km=1;
  }
 km++;
 delay(100);
 }
 if(ch1>=49)
 t1=millis();
 else if(ch1<=49)
 t1=t0;
}

 else if(analogRead(s_pin)>100)
{
 k=1;
Serial.println("T");
t2=millis();
if(t2-t1>tp){
Serial.println("a");
}
delay(5000);
}
}
  }
else
Serial.println("NULL");
delay(5000);
}
