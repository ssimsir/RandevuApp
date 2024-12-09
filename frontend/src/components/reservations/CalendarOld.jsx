import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import trLocale from "@fullcalendar/core/locales/tr";
import "./calendar.css";
import { useSelector } from "react-redux";
import useBiltekRequest from "../../services/useBiltekRequest";
import NewReservationModal from "./NewReservationModal";
import UpdateReservationModel from "./UpdateReservationModel";
import {dateTimeToString} from "./dateTimeFormater"
import useAxios from "../../services/useAxios";

export default function Calendar() {
	const [weekendsVisible, setWeekendsVisible] = useState(true);
	const [currentEvents, setCurrentEvents] = useState([]);

	const [modalStartTime, setModalStartTime] = useState("");
	const [modalEndTime, setModalEndTime] = useState("");
	const [newModelopen, setNewModelopen] = useState(false);
	const [updateModelopen, setUpdateModelopen] = useState(false);
	const [reservationId, setReservationId] = useState(0);
	const [selectInfo, setSelectInfo] = useState(null);

	const { reservations, reservationsLoading } = useSelector(
		(state) => state.biltek
	);
	const { getBiltek } = useBiltekRequest();
	const { axiosPublic } = useAxios();
	useEffect(() => {
		getBiltek("reservations");
	}, []);

	const handleOpen = (selectInfo) => {
		setModalStartTime(dateTimeToString(new Date(selectInfo.startStr)));
		setModalEndTime(dateTimeToString(new Date(selectInfo.endStr)));

		getBiltek("clients");
		getBiltek("products");

		setSelectInfo(selectInfo);
		setNewModelopen(true);
	};

	function handleWeekendsToggle() {
		setWeekendsVisible(!weekendsVisible);
	}

	const handleDateSelect = (selectInfo) => {
		handleOpen(selectInfo);
	};

	//silme için üzerinde çalışılacak
	const handleEventClick = (clickInfo) => {
		getBiltek("clients");
		getBiltek("products");
		setUpdateModelopen(true);
		setReservationId(clickInfo.event._def.publicId);
		//console.log(clickInfo.event._def.publicId);
		// if (
		// 	window.confirm(
		// 		`Are you sure you want to delete the event '${clickInfo.event.title}'`
		// 	)
		// ) {
		// 	clickInfo.event.remove();
		// }
	};

	function handleEvents(events) {
		setCurrentEvents(events);
	}

	return (
		<div className="demo-app">
			{/*console.log(reservations)*/}
			{/*console.log(reservationsLoading)*/}
			{reservationsLoading ? (
				<div>Yükleniyor...</div>
			) : (
				<>
					<Sidebar
						weekendsVisible={weekendsVisible}
						handleWeekendsToggle={handleWeekendsToggle}
						currentEvents={currentEvents}
					/>
					<div className="demo-app-main">
						<FullCalendar
							//key={modalValues}
							locale={trLocale}
							plugins={[
								dayGridPlugin,
								timeGridPlugin,
								interactionPlugin,
							]}
							headerToolbar={{
								left: "prev,next today",
								center: "title",
								right: "dayGridMonth,timeGridWeek,timeGridDay",
							}}
							slotMinTime={"08:00:00"}
							slotMaxTime={"19:00:00"}
							slotDuration={"00:15:00"}
							slotLabelFormat={{
								hour: "numeric",
								minute: "2-digit",
								meridiem: "long",
							}}
							initialView="timeGridWeek"
							editable={true}
							selectable={true}
							selectMirror={true}
							dayMaxEvents={true}
							weekends={weekendsVisible}
							initialEvents={reservations}
							eventColor="gray"
							select={handleDateSelect}
							eventContent={renderEventContent} // custom render function
							eventClick={handleEventClick}
							eventsSet={handleEvents} // called after events are initialized/added/changed/removed
							/* you can update a remote database when these fire:*/
							eventAdd={function (info) {
								//const event = info.event;
								console.log("Etkinlik eklendi:", info.event);
							}}
							eventChange={function (info) {
								console.log("Etkinlik değişti:", info.event);
								const startTime = new Date(info.event._instance.range.start)
								const endTime = new Date(info.event._instance.range.end)

								//let formattedDate = currentDate.toLocaleDateString('tr-TR');
								console.log("startTime", startTime.toLocaleString('tr-TR'));
								console.log("endTime", endTime.toLocaleString('tr-TR'));
								if (
									window.confirm(
										`'${info.event._def.title}' Randevu güncellenecektir eminmisiniz`
									)
								) {
									axiosPublic
										.put(
											`/reservations/${info.event._def.publicId}`,
											{
												startTime: info.event._instance.range.start,
												endTime: info.event._instance.range.end,
											}
										)
										.then((response) => {
											getBiltek("reservations");
										})
										.catch((error) => {
											console.error("Hata:", error);
										});
								} else {
									getBiltek("reservations");
								}
							}}
							eventRemove={function (info) {
								console.log("Etkinlik silindi:", info.event);
							}}
						/>
					</div>

					<NewReservationModal
						modalStartTime={modalStartTime}
						modalEndTime={modalEndTime}
						open={newModelopen}
						setOpen={setNewModelopen}
						selectInfo={selectInfo}
					/>
					<UpdateReservationModel
						open={updateModelopen}
						setOpen={setUpdateModelopen}
						reservationId={reservationId}
						selectInfo={selectInfo}
					/>
				</>
			)}
		</div>
	);
}

function renderEventContent(eventInfo) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	);
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
	currentEvents = currentEvents.sort((a, b) => {
		if (a.start < b.start) {
			return -1;
		}
	});

	return (
		<div className="demo-app-sidebar">
			<div className="demo-app-sidebar-section">
				<label>
					<input
						type="checkbox"
						checked={weekendsVisible}
						onChange={handleWeekendsToggle}
					></input>
					Haftasonu Göster
				</label>
			</div>
			<div className="demo-app-sidebar-section">
				<h2>Randevu Sayısı ({currentEvents.length})</h2>
				{/* <ul>
					{currentEvents.map((event) => (
						<SidebarEvent key={event.id} event={event} />
					))}
				</ul> */}
			</div>
		</div>
	);
}

// function SidebarEvent({ event }) {
// 	return (
// 		<li key={event.id}>
// 			<b>
// 				{new Date(event.start).toLocaleString("tr-TR")}
// 				{/* {formatDate(event.start, {
// 					year: "numeric",
// 					month: "long",
// 					day: "numeric",
// 				})} */}
// 			</b>
// 			<br />
// 			<i>{event.title}</i>
// 		</li>
// 	);
// }
