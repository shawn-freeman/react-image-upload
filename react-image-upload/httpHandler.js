import { Platform } from "react-native";

export class HttpHandler {
   baseUrl;

   constructor(){
      this.baseUrl = 'https://localhost:7136/'
   }

   async PostRequest(url, data){
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      let result = await fetch(`${this.baseUrl}${url}`, {
         method: 'POST',
         headers,
         body: JSON.stringify(data)
      })
      .then(response => this.handleResponse(response))
      .then((responseData) => {
         if(responseData.error){
            alert(responseData.error);
            return Promise.reject(responseData.error);
         }else{
            return responseData;
         }
      })
      .catch((error) => {
         console.log("PostRequest CatchError:", error);
         return null;
      });

      return result;
   }

   handleResponse(response){
      if(response.status == 200 || response.status == 400){
         try{
            return response.json();
         }catch(error){
            return response;
         }
      }else{
         alert('Fatal Server Error');
         console.log("ResponseError: " + response);
         return Promise.reject(response.json());
      }
   }
 }