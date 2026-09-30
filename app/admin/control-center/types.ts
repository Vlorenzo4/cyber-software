import type { TipoProyecto } from "@prisma/client";

export type ProyectoNodoData = {
  nombreProyecto: string;
  clienteNombre: string;
  tipo: TipoProyecto;
  hasTicketUrgente: boolean;
};

export type ProyectoResumen = ProyectoNodoData & { id: string };
