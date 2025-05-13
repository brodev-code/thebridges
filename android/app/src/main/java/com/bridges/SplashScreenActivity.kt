package com.bridges // <- burayı kendi package ismine göre değiştir

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.os.Handler
import android.os.Looper

class SplashScreenActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // İstersen bir splash layout gösterebilirsin, örneğin:
        // setContentView(R.layout.activity_splash)

        // Splash ekranını 2 saniye göster ve sonra MainActivity'e geç
        Handler(Looper.getMainLooper()).postDelayed({
            val intent = Intent(this@SplashScreenActivity, MainActivity::class.java)
            startActivity(intent)
            finish() // splash ekranı geri tuşuyla geri dönülmez yapar
        }, 2000)
    }
}
