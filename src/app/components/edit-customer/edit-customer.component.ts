import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = {
    name: '',
    last_name: '',
    email: '',
    balance: 0
  };

  id: string;

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(this.id).subscribe(customer => {
      this.customer = customer;
    });
  }
}
