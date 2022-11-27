import { Select } from '@chakra-ui/react';

export default function MySelect({ value, placeholder, onChange, options }) {
  return (
    <Select
      display={'inline'}
      size={'sm'}
      variant={'filled'}
      color={'brand.200'}
      bg={'black'}
      fontSize={'16px'}
      value={value} // toTitleCase(props.id)
      placeholder={placeholder} // myPlaceholder
      onChange={(e) => {
        let value = e.target.value.toLowerCase();
        if (value !== props.id) {
          router.push('/hoods/' + encodeURIComponent(value));
        }
      }}
    >
      {props.neighborhoods.map((n) => {
        return (
          <option key={n.id} value={n.id}>
            {n.display_name}
          </option>
        );
      })}
    </Select>
  );
}
