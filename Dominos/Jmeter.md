_Pre requisite - Install Java in your machine. [Type Java -version in your terminal to check if you have Java installed]_

Below is a high level overview of how to configure Jmeter to do load testing on an API with POST method, that has body data and header in the below format. The way we configure Jmeter changes depending on how your api is designed. However below example can give you an understanding on how to start with.

![[Pasted image 20250827133222.png]]


1. Go to [Apache JMeter - Download Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) → Go to, Download releases tab → Under binaries, download the zip file. Unzip it and extract to location of your choice.
    
2. In terminal, type jmeter and hit enter. This will open the Jmeter GUI.
    
3. To start with, rename “test plan” to your project under load test,
    

![[Pasted image 20250827133239.png]]


4. Right click on test plan-->Add → Thread → Thread group. Example below. I added 140 users that are to be ramped up in 60 secs.
    

![[Pasted image 20250827133645.png]]

5. Right click on thread group and add your protocol. → Add → Config element → HTTP Request defaults. This test was for upsell service. See values below.
    

Choose request type and path to api call and pass body if needed.

![[Pasted image 20250827133659.png]]


6. Right click on protocol and add header→ Add → Config element → HTTP header manager.
    

Add required headers. Example below

![[Pasted image 20250827133712.png]]


7. Save the above details. Create a folder to save your results. In below example, I created “UpsellResults_Run6”. After that, to run the load test, type the below in terminal with the correct path to the folder you created now.
    

`jmeter -n -t <test JMX file> -l <test log file> -e -o <Path to output folder>`

Example,

jmeter -n -t /Users/shalu.prabhash/Jmeter/Upsell.jmx -l /Users/shalu.prabhash/Jmeter/UpsellResults_Run7/jtl -e -o /Users/shalu.prabhash/Jmeter/UpsellResults_Run7

![[Pasted image 20250827134307.png]]


Once it finishes executing, the folder you created will have the results

![[Pasted image 20250827134330.png]]


Open, index.html file to see the results

![[Pasted image 20250827134344.png]]


Below gives a high level definition of what each field means in the results.

![[Pasted image 20250827134358.png]]
