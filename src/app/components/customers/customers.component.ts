import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  customer: Customer = {
    name: '',
    last_name: '',
    email: '',
    balance: 0
  };

  constructor(private customerService: CustomerService) { }
  
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      customers => {
        this.customers = customers;
      }
    );
  }

  getTotalBalance(): number {
    let totalBalance: number = 0;
    if (this.customers) {
      this.customers.forEach(customer => {
        totalBalance += customer.balance;
      })
    }

    return totalBalance;
  }

  addCustomer(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      alert('Please fill in the form');
    } else {
      // Create new costumer
    }
  }
}
