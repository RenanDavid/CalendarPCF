import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as FullCalendar from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Para clique nos eventos

export class SampleControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private calendar: FullCalendar.Calendar;

    constructor() {
        // empty constructor
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ) {
        this.container = document.createElement("div");
        container.appendChild(this.container);

        let calendarEl = document.createElement("div");
        this.container.appendChild(calendarEl);

        this.calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            events: [] // Eventos serão carregados a partir da propriedade
        });

        this.calendar.render();

        // Carregar dados da propriedade inicial
        this.updateEvents(context.parameters.eventsData.raw || '');
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Atualizar os eventos quando os dados mudarem
        this.updateEvents(context.parameters.eventsData.raw || '');
    }

    private updateEvents(eventsData: string) {
        if (!eventsData) {
            return;
        }

        try {
            let events = JSON.parse(eventsData);

            // Atualizar o calendário com os eventos
            this.calendar.removeAllEvents();
            this.calendar.addEventSource(events);
        } catch (e) {
            console.error("Error parsing events data: ", e);
        }
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Código para limpar recursos
    }
}
