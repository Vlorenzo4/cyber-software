-- RenameEnumValue
-- Renombra el valor del enum en lugar de borrarlo y recrearlo, así las filas
-- que ya tienen estado = 'ABIERTO' quedan con estado = 'NUEVO' sin perder datos.
ALTER TYPE "EstadoTicket" RENAME VALUE 'ABIERTO' TO 'NUEVO';
