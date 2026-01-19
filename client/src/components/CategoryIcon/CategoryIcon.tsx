// Iconos de categorías usando imágenes de assets
import comidaIcon from "../../assets/imagenes/comida.png";
import transporteIcon from "../../assets/imagenes/transporte.png";
import supermercadoIcon from "../../assets/imagenes/supermercado.png";
import saludIcon from "../../assets/imagenes/salud.png";
import entretenimientoIcon from "../../assets/imagenes/entretenimiento.png";
import educacionIcon from "../../assets/imagenes/educacion.png";
import deporteIcon from "../../assets/imagenes/deporte.png";
import regalosIcon from "../../assets/imagenes/regalos.png";
import viajesIcon from "../../assets/imagenes/viajes.png";
import viviendaIcon from "../../assets/imagenes/vivienda.png";
import { HelpCircle } from "lucide-react";

interface CategoryIconProps {
  categoryName: string;
}

export const CategoryIcon = ({ categoryName }: CategoryIconProps) => {
  const getIcon = (name: string): string | null => {
    const normalizedName = name.toLowerCase();

    if (normalizedName.includes("comida") || normalizedName.includes("alimento") || normalizedName.includes("restaurante")) {
      return comidaIcon;
    }
    if (normalizedName.includes("transporte") || normalizedName.includes("auto") || normalizedName.includes("bus")) {
      return transporteIcon;
    }
    if (normalizedName.includes("supermercado") || normalizedName.includes("compra") || normalizedName.includes("shopping")) {
      return supermercadoIcon;
    }
    if (normalizedName.includes("salud") || normalizedName.includes("medico") || normalizedName.includes("farmacia")) {
      return saludIcon;
    }
    if (normalizedName.includes("ocio") || normalizedName.includes("juego") || normalizedName.includes("entretenimiento")) {
      return entretenimientoIcon;
    }
    if (normalizedName.includes("educación") || normalizedName.includes("curso") || normalizedName.includes("universidad")) {
      return educacionIcon;
    }
    if (normalizedName.includes("deporte") || normalizedName.includes("gym") || normalizedName.includes("fitness")) {
      return deporteIcon;
    }
    if (normalizedName.includes("regalo") || normalizedName.includes("obsequio")) {
      return regalosIcon;
    }
    if (normalizedName.includes("viaje") || normalizedName.includes("vacacion") || normalizedName.includes("turismo")) {
      return viajesIcon;
    }
    if (normalizedName.includes("vivienda") || normalizedName.includes("hogar") || normalizedName.includes("casa") || normalizedName.includes("alquiler")) {
      return viviendaIcon;
    }

    return null;
  };

  const iconSrc = getIcon(categoryName);

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-zinc-600">
      <div className="p-2 bg-zinc-100 rounded-full flex items-center justify-center w-14 h-14">
        {iconSrc ? (
          <img src={iconSrc} alt={categoryName} className="w-8 h-8 object-contain" />
        ) : (
          <HelpCircle className="w-8 h-8 text-red-600" />
        )}
      </div>
      <span className="text-sm font-medium capitalize">{categoryName}</span>
    </div>
  );
};
