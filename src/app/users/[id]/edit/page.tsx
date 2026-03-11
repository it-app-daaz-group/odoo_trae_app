import UserForm from "@/components/UserForm";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  return <UserForm id={id} />;
}
