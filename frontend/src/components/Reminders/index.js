import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listReminders } from "../../store/reminders";
import { listNotes } from "../../store/notes";
import ReminderDetails from "./ReminderDetails";
import ReminderCreateModal from "./ReminderCreate";

import './Reminders.css'
import './Construction.css'

const RemindersPage = () => {
  const reminders = useSelector(state => state.reminders)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const userId = session.user.id;
  const reminderArr = Object.values(reminders);
  reminderArr.sort(function (a, b) {
    return new Date(a.time).getTime() - new Date(b.time).getTime()
  })

  console.log("THIS IS MY SESSION INFO", session)

  useEffect(() => {
    if (userId) {
      dispatch(listReminders(userId))
      dispatch(listNotes(userId))
    }
  }, [dispatch, userId])

  return (
    <div className="main-reminder-div">
      {/* <div className="under-construction">
        <div className="construction1"><b>REMINDERS</b> are currently under construction!</div>
        <div className="tools">
          <span className="fas fa-wrench"></span>
          <div className="construction2">Please check back later.</div>
          <span className="fas fa-screwdriver"></span>
        </div>
      </div> */}
      <div className='reminder-fab-div'>
        < ReminderCreateModal />
      </div>

      <nav
        className="reminderList">
        <div className="reminder rem-alert">
          <div className="reminder-text rem-alert">
            <div className="reminder-date rem-alert-bell">
              <span className="fas fa-bell" />
              Coming Soon!

            </div>
            <div className="reminder-title">
              Reminder Notifications
            </div>
          </div>
        </div>

        {reminderArr?.map((reminder) => {
          return (
            <div className={
              +new Date(reminder?.time).getTime() < +new Date().getTime() ?
                "reminder overdue-reminder" :
                "reminder"}
            >
              <div className="reminder-text">
                <div className="reminder-date">
                  <div className="reminder-time">
                    {new Date(reminder?.time).getHours() < 13
                      ?
                      new Date(reminder?.time).getHours()
                      :
                      (new Date(reminder?.time).getHours() - 12)}
                    :{new Date(reminder?.time).getMinutes() < 10
                      ?
                      `0${(new Date(reminder?.time).getMinutes())}`
                      :
                      new Date(reminder?.time).getMinutes()}
                    {new Date(reminder?.time).getHours() > 12
                      ? "PM" : "AM"}
                  </div>
                  <div className="on-sign">
                    on
                  </div>
                  {new Date(reminder?.time).toDateString().split(" ")[1]} {new Date(reminder?.time).toDateString().split(" ")[2]}
                </div>
                <div className="reminder-title">{reminder?.title}</div>
              </div>

              <ReminderDetails
                reminder={reminder}
              >
              </ReminderDetails>
            </div>
          )
        })}
      </nav>
    </div >
  )
}

export default RemindersPage;
