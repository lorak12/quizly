import { OrganizationList } from "@clerk/nextjs";

export default function OrganizationListPage() {
  return (
    <OrganizationList
      afterCreateOrganizationUrl="/admin/dashboard/organization"
      afterSelectPersonalUrl="/admin/dashboard/"
      afterSelectOrganizationUrl="/admin/dashboard/organization-profile"
    />
  );
}
