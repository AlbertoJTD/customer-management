import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/models/configuration.model';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  allowRegistration: boolean = false;

  constructor(private router: Router, private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.configurationService.getConfiguration().subscribe(
      (configuration: Configuration) => {
        this.allowRegistration = configuration.allowRegistration ?? false;
      }
    );
  }

  save() {
    let configuration = {allowRegistration: this.allowRegistration};
    this.configurationService.updateConfiguration(configuration);

    this.router.navigate(['/']);
  }
}
