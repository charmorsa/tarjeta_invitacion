import * as admin from 'firebase-admin';

const firebaseConfig:{} = {
  type: "service_account",
  project_id: "fbchar-70043",
  private_key_id: "f17781115ff68e5b50ff981ad97ce1cb66c94cf0",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDlhtFry+xvoSYy\nvdMYvbUXV2Zdwa5stUGszIpkto4fagkzVbTbM7yfGMJAUyqP8EwqIUUF/sWzjGwx\nuiHEEY7O4mWnTQ1l70HSglYuqIwOA7qBkGnbPVmCg8Ws4is0h0R0HVgWPWyyUbDP\n3IACCu1vKbOGFp3q5jeR6mG2QAOEyg4dJPN1eTaZZyEZvaGkVH9PsicTIt08ur+j\nq659KCsJ6d4wbdoVxaoOrwGAOFpf5uu3ftrSubiityd0kYzW/4wS5ck2+77/ZloF\nxcmps3abuAkN+Pz5EtNlBXGvF3b3J/MUqMBZuhBnjE0SPmdYjxyF0lEA5bYqIt6R\nYZq069wLAgMBAAECggEALClb6tsyEypU4KdwUc7SZHrO+dQVnNnlGHvEVute/gFX\nYtanNRPHw26ulVTLGCW6adK75pLl9A1dFdZDv+dG7FxYBbAIF2hI6FlmfpS0Wc/y\n1xHzpBiyO6/h3Uko2fL6w0KQG7tWyhp4pA2/XWU/2McTwQVh/fusjnkjsr6vTqF6\nb/g/AiiRX2zhGGaXQ3T9ydVjqBtuMem9icspZt45d5ylaUlDQWJLTEY1zKSqm3+d\nAa7mn3R79KXNMbEDRoKd1JIrZlOLQ6rv2YS9NQkBBPnvzEQLmmQwMgAk1vu6d7p1\nMY6E1KUJWFrB1U8nC9LHmG96p1TQ8EqP4OImG2Mk5QKBgQD6n8x2GrVVfGS8nghn\nPWO/2ZZ/gQOwO+WIM94f0VEikkQHMxC0/EhXaJmaWcfJP0Cr+kpL+DMQqp8PJSC9\nIpacP28uh7U97E8veYgim/XPQzT8AwWOjds1cCFjG8EoC0+OcMxdKmYMJvS95x59\nNBg3XhDVbop771AaAM4JKfIONQKBgQDqcyupt3kv5V2925dZpWpFh7oIKInl6IW5\ndg/mmWnHxyN6rVwUBcE9cRhGMU1T0mPpXiHX51g6F1gUlcNcTovJ6G9399OIAOKx\n5zaFnEcouLwf+G2pwM4iqv6IwFXiCBOygjne+VPAvV3ytWSMijO6JAyUHFcujcm9\ndcmFjcCJPwKBgCRUXbMRFBAcRA4DanxsrbT1uZcqAHrfc9pWinBaS0STp0DT6iwS\nFfp1sy5orUlC3gEP+w0gIWbdFMmBPEmuZd6oY1l/WoprYt8i4tUBfpRYzalqVrff\nYFNSucRAFbPUT+f5+eXXa4t/aiLNCeJkVs5P2GjX6UMl4ZqjWzqA1hGxAoGARO+U\nWRTPl1uz0o1s1TkkJEmiU5/H3EggecXTKxTU258cOYgb2O9QQIaugoUgnZLxOb8p\n6Ffnwzz18yeOB+g4hifIDthZ5FWOUo0PpP2slraq6iOb6xv8AImSyhbzqcCCOiy8\nY2mgTL3hj+nyJLjGOOc8o5gpslCSjxjBJnnlsPUCgYBzHEsa2K97/pllRPaZZdwR\nC7+CerlU2WfmNh/KBxXoWw5XavwJQBRx0ss/Sed97OlP76WLEm7yFsn4gVw8DRdj\nOmScG6oKTl1ihA+tU5xEa4BhITuaWpmGRyGVQKtHXoYD8KltucviGNU3n5YcDGD7\nvTisQMaqCw5qynMNgamIrg==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-zxiiq@fbchar-70043.iam.gserviceaccount.com",
  client_id: "105538128250239229260",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zxiiq%40fbchar-70043.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

export const dbFire = admin.initializeApp(
  { 
    credential: admin.credential.cert(firebaseConfig), 
    storageBucket: 'gs://fbchar-70043.appspot.com'
  }
)

export const bucket = admin.storage().bucket();