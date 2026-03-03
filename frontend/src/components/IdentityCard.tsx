interface IdentityProps {
  data: any;
}

const IdentityCard = ({ data }: IdentityProps) => {
  if (!data) return null;

  const identity = data.contact;

  return (
    <div className="mt-8 p-6 rounded-2xl bg-white text-gray-800 shadow-xl">
      <h3 className="text-xl font-bold text-indigo-600 mb-4">
        Identity Result
      </h3>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Primary ID:</strong> {identity.primaryContactId}
        </p>

        <p>
          <strong>Emails:</strong>{" "}
          {identity.emails?.join(", ") || "None"}
        </p>

        <p>
          <strong>Phone Numbers:</strong>{" "}
          {identity.phoneNumbers?.join(", ") || "None"}
        </p>

        <p>
          <strong>Secondary IDs:</strong>{" "}
          {identity.secondaryContactIds?.join(", ") || "None"}
        </p>
      </div>
    </div>
  );
};

export default IdentityCard;