import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useParcels = () => {
  return useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const { data } = await axios.get("/api/parcels");
      return data.data;
    },
  });
};
