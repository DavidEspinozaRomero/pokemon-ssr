import { isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export default class AboutPageComponent implements OnInit {
  title = inject(Title)
  meta = inject(Meta)
  platform = inject(PLATFORM_ID)

  ngOnInit(): void {
    this.title.setTitle('About')
    this.meta.addTag({ name: 'og:title', content: 'About' })
    this.meta.addTag({ name: 'description', content: 'Este es mi about page' })

    if (!isPlatformServer(this.platform)) {
      document.title = 'about page'
    }
  }

}
