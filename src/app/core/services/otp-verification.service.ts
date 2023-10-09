import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../core/config/config';

@Injectable({
  providedIn: 'root'
})
export class OtpVerificationService {
  forgotPassword:boolean= true;
  fpMessage:any='';
  resetMessage:any='';
  emailid:any;
  private baseUrl: string = Config.baseUrl;
  private sendOtpURL: string = this.baseUrl+'login-i/sendOTP';
  private verifyOtpURL: string = this.baseUrl+'login-i/verifyOTP';
  private verifySignUpOtpURL: string = this.baseUrl+'login-i/verifyOTPSignUp';
  private setPwdURL: string = this.baseUrl+'login-i/registerUser';
  private sendFpOtpURL: string = this.baseUrl+'login-i/VerifyUserSendFPOTP';
  private verifyFpOtpURL: string = this.baseUrl+'login-i/verifyFPOTPSendMail';
  private checkFpLinkURL: string = this.baseUrl+'login-i/validateFPLink';
  private resetPwdURL: string = this.baseUrl+'login-i/saveResetPassword';
  constructor(private http: HttpClient) { }

  sendOTP(payload:any){
   return this.http.post(this.sendOtpURL,payload)
  }
  verifyOTP(payload:any){
    return this.http.post(this.verifyOtpURL,payload)
  }
  verifysignupOTP(payload:any){
    return this.http.post(this.verifySignUpOtpURL,payload)
  }
  setPassword(payload:any){
    return this.http.post(this.setPwdURL,payload, { observe: 'response' })
  }
  sendFPOTP(payload:any){
    return this.http.post(this.sendFpOtpURL,payload)
  }
  verifyFPOTP(payload:any){
    return this.http.post(this.verifyFpOtpURL,payload)
  }
  checkFPLink(resetId:any){
    const headers = new HttpHeaders({
      "resetid": resetId,
    });
    return this.http.get(this.checkFpLinkURL,{ headers})
  }
  resetPassword(payload:any){
    return this.http.post(this.resetPwdURL,payload, { observe: 'response' })
  }
}
