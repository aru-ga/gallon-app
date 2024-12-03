import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
} from "@/api/location";
import { Location } from "@/types/locationTypes";

interface ComboboxAddressProps {
  onChange: (addressData: {
    province: Location | null;
    regency: Location | null;
    district: Location | null;
    village: Location | null;
  }) => void;
}

export function ComboxAddress({ onChange }: ComboboxAddressProps) {
  const [selectedProvince, setSelectedProvince] =
    React.useState<Location | null>(null);
  const [selectedRegency, setSelectedRegency] = React.useState<Location | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] =
    React.useState<Location | null>(null);
  const [selectedVillage, setSelectedVillage] = React.useState<Location | null>(
    null
  );

  const [provinces, setProvinces] = React.useState<Location[]>([]);
  const [regencies, setRegencies] = React.useState<Location[]>([]);
  const [districts, setDistricts] = React.useState<Location[]>([]);
  const [villages, setVillages] = React.useState<Location[]>([]);

  React.useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  const handleProvinceSelect = async (province: Location) => {
    setSelectedProvince(province);
    setSelectedRegency(null);
    setSelectedDistrict(null);
    setSelectedVillage(null);
    onChange({ province, regency: null, district: null, village: null });

    const data = await getRegencies(parseInt(province.id));
    setRegencies(data);
    setDistricts([]);
    setVillages([]);
  };

  const handleRegencySelect = async (regency: Location) => {
    setSelectedRegency(regency);
    setSelectedDistrict(null);
    setSelectedVillage(null);
    onChange({
      province: selectedProvince,
      regency,
      district: null,
      village: null,
    });

    const data = await getDistricts(parseInt(regency.id));
    setDistricts(data);
    setVillages([]);
  };

  const handleDistrictSelect = async (district: Location) => {
    setSelectedDistrict(district);
    setSelectedVillage(null);
    onChange({
      province: selectedProvince,
      regency: selectedRegency,
      district,
      village: null,
    });

    const data = await getVillages(parseInt(district.id));
    setVillages(data);
  };

  const handleVillageSelect = (village: Location) => {
    setSelectedVillage(village);
    onChange({
      province: selectedProvince,
      regency: selectedRegency,
      district: selectedDistrict,
      village,
    });
  };

  const renderDropdown = (
    label: string,
    options: Location[],
    selectedOption: Location | null,
    onSelect: (option: Location) => void,
    delay: number
  ) => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[400px] justify-between"
          style={{
            animation: `fadeInSlide 0.4s ease ${delay}s forwards`,
            opacity: 0,
          }}
        >
          {selectedOption ? selectedOption.name : label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    onSelect(option);
                  }}
                >
                  {option.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedOption && selectedOption.id === option.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-4 flex flex-col py-4 dark:text-white text-black">
      {renderDropdown(
        "Select Province",
        provinces,
        selectedProvince,
        handleProvinceSelect,
        0
      )}
      {selectedProvince &&
        renderDropdown(
          "Select Regency",
          regencies,
          selectedRegency,
          handleRegencySelect,
          0.1
        )}
      {selectedRegency &&
        renderDropdown(
          "Select District",
          districts,
          selectedDistrict,
          handleDistrictSelect,
          0.2
        )}
      {selectedDistrict &&
        renderDropdown(
          "Select Village",
          villages,
          selectedVillage,
          handleVillageSelect,
          0.3
        )}
    </div>
  );
}
