import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as FullCalendar from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

export class SampleControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;

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

        let calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            initialView: 'dayGridMonth',
            events: [] // Eventos serão adicionados posteriormente
        });

        calendar.render();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Código para atualizar a visualização
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Código para limpar recursos
    }
}
