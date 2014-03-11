//Open the Connection
HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
urlConnection.setRequestMethod("POST");
urlConnection.setDoInput(true);
urlConnection.setDoOutput(true);
urlConnection.setUseCaches(false);
urlConnection.setRequestProperty("Content-Type",
                                 "application/x-www-form-urlencoded");

// Form the POST parameters
StringBuilder content = new StringBuilder();
content.append("Email=").append(URLEncoder.encode(youremail, "UTF-8"));
content.append("&Passwd=").append(URLEncoder.encode(yourpassword, "UTF-8"));
content.append("&service=").append(URLEncoder.encode(yourapp, "UTF-8"));
OutputStream outputStream = urlConnection.getOutputStream();
outputStream.write(content.toString().getBytes("UTF-8"));
outputStream.close();

// Retrieve the output
int responseCode = urlConnection.getResponseCode();
InputStream inputStream;
if (responseCode == HttpURLConnection.HTTP_OK) {
  inputStream = urlConnection.getInputStream();
} else {
  inputStream = urlConnection.getErrorStream();
}