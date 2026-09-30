-- RenameEnumValue
-- Renombra el valor del enum en lugar de borrarlo y recrearlo, así las filas
-- que ya tienen estado = 'CONVERTIDA' quedan con estado = 'CONTRATADA' sin
-- perder datos.
ALTER TYPE "EstadoConsulta" RENAME VALUE 'CONVERTIDA' TO 'CONTRATADA';
