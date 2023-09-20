export interface OrderDataTracking {
  id: number;
  parent_id: number;
  status: "pending" | "processing" | "completed";
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: Ing;
  shipping: Ing;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: null;
  date_paid: null;
  cart_hash: string;
  number: string;
  meta_data: any[];
  line_items: LineItem[];
  tax_lines: any[];
  shipping_lines: any[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt: null;
  date_paid_gmt: null;
  currency_symbol: string;
  _links: Links;
}

export interface Links {
  self: Collection[];
  collection: Collection[];
}

export interface Collection {
  href: string;
}

export interface Ing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone: string;
}

export interface LineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: any[];
  sku: string;
  price: number;
  image: Image;
  parent_name: null;
}

export interface Image {
  id: string;
  src: string;
}

export interface ProductCardProps {
  image: string;
  name: string;
  isNew: boolean;
  price: number;
  rating: number;
  numReviews: number;
  comments: Array<Comment>;
}

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  ratings: number;
  image: string;
  categoryId: string | null;
  comments: Array<Comment>;
}

export interface CartData {
  cart_hash: string;
  cart_key: string;
  currency: Currency;
  customer: Customer;
  items: Item[];
  item_count: number;
  items_weight: number;
  coupons: any[];
  needs_payment: boolean;
  needs_shipping: boolean;
  shipping: Shipping;
  fees: any[];
  taxes: any[];
  totals: DataTotals;
  removed_items: any[];
  cross_sells: any[];
  notices: any[];
}

export interface Currency {
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface Customer {
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
}

export interface BillingAddress {
  billing_first_name: string;
  billing_last_name: string;
  billing_company: string;
  billing_country: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_postcode: string;
  billing_city: string;
  billing_state: string;
  billing_phone: string;
  billing_email: string;
}

export interface ShippingAddress {
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_company: string;
  shipping_country: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_postcode: string;
  shipping_city: string;
  shipping_state: string;
}

export interface Item {
  item_key: string;
  id: number;
  name: string;
  title: string;
  price: string;
  quantity: Quantity;
  tax_data: TaxData;
  totals: ItemTotals;
  slug: string;
  meta: Meta;
  cart_item_data: any[];
  featured_image: string;
}

export interface Meta {
  product_type: string;
  sku: string;
  dimensions: Dimensions;
  weight: number;
  variation: any[];
}

export interface Dimensions {
  length: string;
  width: string;
  height: string;
  unit: string;
}

export interface Quantity {
  value: number;
  min_purchase: number;
  max_purchase: number;
}

export interface TaxData {
  subtotal: any[];
  total: any[];
}

export interface ItemTotals {
  subtotal: number;
  subtotal_tax: number;
  total: number;
  tax: number;
}

export interface Shipping {
  total_packages: number;
  show_package_details: boolean;
  has_calculated_shipping: boolean;
  packages: Packages;
}

export interface Packages {
  default: Default;
}

export interface Default {
  package_name: string;
  rates: Rates;
  package_details: string;
  index: number;
  chosen_method: string;
  formatted_destination: string;
}

export interface Rates {
  "flat_rate:1": FlatRate1;
}

export interface FlatRate1 {
  key: string;
  method_id: string;
  instance_id: number;
  label: string;
  cost: string;
  html: string;
  taxes: any[];
  chosen_method: boolean;
}

export interface DataTotals {
  subtotal: string;
  subtotal_tax: string;
  fee_total: string;
  fee_tax: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  total: string;
  total_tax: string;
}
