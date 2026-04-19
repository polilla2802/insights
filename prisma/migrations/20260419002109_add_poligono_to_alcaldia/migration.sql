-- CreateEnum
CREATE TYPE "TipoExperiencia" AS ENUM ('RESTAURANTE', 'MUSEO', 'EVENTO', 'TOUR', 'ACTIVIDAD');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('VISITANTE', 'HOST', 'ADMIN');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA');

-- CreateEnum
CREATE TYPE "TierEmpresa" AS ENUM ('STANDARD', 'PREMIUM', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "EstadoCampana" AS ENUM ('BORRADOR', 'ACTIVA', 'PAUSADA', 'FINALIZADA');

-- CreateEnum
CREATE TYPE "TipoAnuncio" AS ENUM ('BANNER', 'CARD', 'STRIP');

-- CreateTable
CREATE TABLE "Alcaldia" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "descripcion" STRING,
    "imagen" STRING,
    "lat" FLOAT8,
    "lng" FLOAT8,
    "poligono" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alcaldia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "icono" STRING,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" STRING NOT NULL,
    "titulo" STRING NOT NULL,
    "descripcion" STRING NOT NULL,
    "precio" FLOAT8 NOT NULL,
    "duracion" INT4 NOT NULL,
    "imagen" STRING,
    "imagenes" STRING[],
    "tipo" "TipoExperiencia" NOT NULL,
    "lugar" STRING,
    "direccion" STRING,
    "rating" FLOAT8 NOT NULL DEFAULT 0,
    "numResenas" INT4 NOT NULL DEFAULT 0,
    "destacada" BOOL NOT NULL DEFAULT false,
    "activa" BOOL NOT NULL DEFAULT true,
    "alcaldiaId" STRING NOT NULL,
    "categoriaId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "email" STRING NOT NULL,
    "foto" STRING,
    "rol" "Rol" NOT NULL DEFAULT 'VISITANTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" STRING NOT NULL,
    "personas" INT4 NOT NULL DEFAULT 1,
    "fecha" TIMESTAMP(3) NOT NULL,
    "total" FLOAT8 NOT NULL,
    "estado" "EstadoReserva" NOT NULL DEFAULT 'PENDIENTE',
    "experienciaId" STRING NOT NULL,
    "usuarioId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "logo" STRING,
    "sitio" STRING,
    "descripcion" STRING,
    "tier" "TierEmpresa" NOT NULL DEFAULT 'STANDARD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campana" (
    "id" STRING NOT NULL,
    "nombre" STRING NOT NULL,
    "presupuesto" FLOAT8 NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "alcaldiaIds" STRING[],
    "estado" "EstadoCampana" NOT NULL DEFAULT 'ACTIVA',
    "empresaId" STRING NOT NULL,
    "impresiones" INT4 NOT NULL DEFAULT 0,
    "clics" INT4 NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anuncio" (
    "id" STRING NOT NULL,
    "tipo" "TipoAnuncio" NOT NULL,
    "titulo" STRING NOT NULL,
    "descripcion" STRING,
    "imagen" STRING,
    "ctaLabel" STRING NOT NULL DEFAULT 'Conocer más',
    "ctaUrl" STRING NOT NULL,
    "alcaldiaIds" STRING[],
    "activo" BOOL NOT NULL DEFAULT true,
    "campanaId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alcaldia_slug_key" ON "Alcaldia"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_slug_key" ON "Categoria"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_alcaldiaId_fkey" FOREIGN KEY ("alcaldiaId") REFERENCES "Alcaldia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_experienciaId_fkey" FOREIGN KEY ("experienciaId") REFERENCES "Experiencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campana" ADD CONSTRAINT "Campana_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuncio" ADD CONSTRAINT "Anuncio_campanaId_fkey" FOREIGN KEY ("campanaId") REFERENCES "Campana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
