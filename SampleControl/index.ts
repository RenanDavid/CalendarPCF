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

        const calendarEl = document.createElement("div");
        this.container.appendChild(calendarEl);

        this.calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            events: [] // Eventos serão carregados a partir da propriedade
        });

        this.calendar.render();

        // Carregar dados de exemplo para teste
        const sampleData = JSON.stringify([
            {
                "title": "Evento 1",
                "start": "2024-07-15T10:00:00",
                "end": "2024-07-15T12:00:00",
                "extendedProps": {
                    "category": "Categoria A",
                    "division": "Divisão 1",
                    "bu": "BU 1",
                    "description": "Descrição do Evento 1",
                    "location": "Local 1"
                }
            },
            {
                "title": "Evento 2",
                "start": "2024-07-16T13:00:00",
                "end": "2024-07-16T15:00:00",
                "extendedProps": {
                    "category": "Categoria B",
                    "division": "Divisão 2",
                    "bu": "BU 2",
                    "description": "Descrição do Evento 2",
                    "location": "Local 2"
                }
            }
        ]);

        this.updateEvents(sampleData);
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
            const events = JSON.parse(eventsData);

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
