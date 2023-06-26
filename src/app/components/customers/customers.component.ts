import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];

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
}
