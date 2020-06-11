import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../_services/event.service';
import { NotifyService } from '../_services/notify.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  newEventForm = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(80)],
    ],
    primaryColor: [colors.red.primary],
    secondaryColor: [colors.blue.primary],
    startDate: [Date.now()],
    endDate: [Date.now()],
  });

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  event: any;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe,
    private notify: NotifyService,
    private fb: FormBuilder,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.eventService.getAllEventsForUser(this.userService.loggedUser).subscribe(
      (res) => {
        this.events = res;
      }
    );
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  addEvent(): void {
    this.event = {};
    this.event.title = this.newEventForm.get('title').value;
    this.event.color = {
      primary: this.newEventForm.get('primaryColor').value,
      secondary: this.newEventForm.get('secondaryColor').value,
    };
    this.event.start = new Date(this.newEventForm.get('startDate').value);
    this.event.end = new Date(this.newEventForm.get('endDate').value);
    
    this.eventService.addEvent(this.event).subscribe(
      (res: any) => {
        this.event.id = res.id;
        this.notify.showSuccess('Event successfully added!');
        this.events = [...this.events, this.event];
      },
      (err) => {
        this.notify.showError('Event has not been added!');
      }
    );
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.eventService.deleteEvent(+eventToDelete.id).subscribe(
      (res)=>{
        this.notify.showSuccess('Event successfully deleted!');
        this.events = this.events.filter((event) => event !== eventToDelete);
      },
      (err)=>{
        this.notify.showError('Event has not been deleted!');
      }
    )
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  logout(){
    this.router.navigate(['']);
    this.userService.resetUser();
  }

}
