import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionWidgetsComponent } from '../session-widgets/session-widgets.component';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { IMessageState } from '../../store/session.reducer';
import { SessionActions } from '../../actions';
import { SocketService } from '../../services/socket.service';
import { StateGetterService } from '../../services/state-getter.service';

@Component({
  selector: 'session',
  directives: [SessionWidgetsComponent],
  providers: [StateGetterService],
  template: require('./session.template.html')
})
export class SessionComponent {
  @select(['session', 'role']) role$: Observable<string>;
  @select(['session', 'messages']) messages$: Observable<IMessageState[]>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: SessionActions,
    private socket: SocketService,
    private state: StateGetterService
  ) {}

  isTeacher() {
    return this.state.getRole() === 'teacher';
  }

  onKeypress(e) {
    if (e.charCode === 13) {
      // use role as the `from` message property as placeholder
      this.socket.sendSessionMessage(
        this.state.getSessionID(),
        e.target.value,
        this.state.getUserName()
      );

      e.target.value = '';
    }
  }
}
