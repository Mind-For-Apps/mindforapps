import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiImageUploadField } from "@/components/admin/MultiImageUploadField";
import { CheckboxGroup } from "@/components/admin/CheckboxGroup";
import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";
import { TextListRepeater } from "@/components/admin/TextListRepeater";
import { KeyFeaturesRepeater } from "./KeyFeaturesRepeater";
import { WebArchitectureRepeater } from "./WebArchitectureRepeater";

type LookupOption = { id: string; name: string };

type CaseStudyRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  problem: string | null;
  context: string | null;
  solution: string | null;
  deliverables: string | null;
  timeline: string | null;
  hours: string | null;
  team_size: string | null;
  website_url: string | null;
  logo_url: string | null;
  main_image_url: string | null;
  client_name: string | null;
  client_photo_url: string | null;
  client_feedback: string | null;
  client_goal: string[];
  the_challenge_was: string[];
  project_based_collaboration: string[];
  suitable_for: string[];
  header_images: string[];
  progress_images: string[];
  text_1: string | null;
  text_2: string | null;
  text_3: string | null;
  text_4: string | null;
  text_5: string | null;
  text_6: string | null;
  text_features: string | null;
  text_tools: string | null;
  text_what_was_built: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_image_url: string | null;
  is_published: boolean;
  sort_order: number;
};

export function CaseStudyForm({
  action,
  caseStudy,
  services,
  tools,
  teamInvolvementTypes,
  selectedServiceIds,
  selectedToolIds,
  selectedTeamIds,
  keyFeatures,
  webArchitecture,
}: {
  action: (formData: FormData) => void;
  caseStudy?: CaseStudyRow;
  services: LookupOption[];
  tools: LookupOption[];
  teamInvolvementTypes: LookupOption[];
  selectedServiceIds: string[];
  selectedToolIds: string[];
  selectedTeamIds: string[];
  keyFeatures: { label: string; iconUrl: string }[];
  webArchitecture: { label: string; iconUrl: string }[];
}) {
  const cs = caseStudy;
  const idPrefix = cs?.id ?? "new";

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormSection title="Basics">
        <div className="grid grid-cols-2 gap-4">
          <TextField name="title" label="Title" defaultValue={cs?.title} required />
          <TextField name="slug" label="Slug" defaultValue={cs?.slug} required />
        </div>
        <TextField name="subtitle" label="Subtitle" defaultValue={cs?.subtitle} />
        <div className="grid grid-cols-3 gap-4">
          <TextField name="deliverables" label="Deliverables" defaultValue={cs?.deliverables} />
          <TextField name="timeline" label="Timeline" defaultValue={cs?.timeline} />
          <TextField name="hours" label="Hours" defaultValue={cs?.hours} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextField name="team_size" label="Team size" defaultValue={cs?.team_size} />
          <TextField name="website_url" label="Website URL" defaultValue={cs?.website_url} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextField name="sort_order" label="Sort order" type="number" defaultValue={cs?.sort_order ?? 0} />
          <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-black">
            <input type="checkbox" name="is_published" defaultChecked={cs?.is_published ?? true} />
            Published
          </label>
        </div>
      </FormSection>

      <FormSection title="Content">
        <TextAreaField name="problem" label="Problem" defaultValue={cs?.problem} />
        <TextAreaField name="context" label="Context" defaultValue={cs?.context} />
        <TextAreaField name="solution" label="Solution" defaultValue={cs?.solution} />
        <TextListRepeater name="client_goal" label="Client Goal" defaultValues={cs?.client_goal} />
        <TextListRepeater name="the_challenge_was" label="The Challenge Was" defaultValues={cs?.the_challenge_was} />
        <TextListRepeater
          name="project_based_collaboration"
          label="Project-based Collaboration"
          defaultValues={cs?.project_based_collaboration}
        />
        <TextListRepeater name="suitable_for" label="Suitable For" defaultValues={cs?.suitable_for} />
      </FormSection>

      <FormSection title="Highlights">
        <div className="grid grid-cols-2 gap-4">
          <TextField name="text_1" label="Stat 1" defaultValue={cs?.text_1} />
          <TextField name="text_2" label="Stat 2" defaultValue={cs?.text_2} />
          <TextField name="text_3" label="Stat 3" defaultValue={cs?.text_3} />
          <TextField name="text_4" label="Stat 4" defaultValue={cs?.text_4} />
          <TextField name="text_5" label="Stat 5" defaultValue={cs?.text_5} />
          <TextField name="text_6" label="Stat 6" defaultValue={cs?.text_6} />
        </div>
        <TextAreaField name="text_features" label="Features intro text" defaultValue={cs?.text_features} />
        <TextAreaField name="text_tools" label="Tools intro text" defaultValue={cs?.text_tools} />
        <TextAreaField
          name="text_what_was_built"
          label="What was built"
          defaultValue={cs?.text_what_was_built}
        />
      </FormSection>

      <FormSection title="Media">
        <div className="grid grid-cols-3 gap-4">
          <ImageUploadField
            name="logo_url"
            label="Logo"
            defaultValue={cs?.logo_url}
            pathPrefix={`case-studies/${idPrefix}`}
          />
          <ImageUploadField
            name="main_image_url"
            label="Main image"
            defaultValue={cs?.main_image_url}
            pathPrefix={`case-studies/${idPrefix}`}
          />
          <ImageUploadField
            name="client_photo_url"
            label="Client photo"
            defaultValue={cs?.client_photo_url}
            pathPrefix={`case-studies/${idPrefix}`}
          />
        </div>
        <MultiImageUploadField
          name="header_images"
          label="Header images"
          defaultValues={cs?.header_images}
          pathPrefix={`case-studies/${idPrefix}/header`}
        />
        <MultiImageUploadField
          name="progress_images"
          label="Progress images"
          defaultValues={cs?.progress_images}
          pathPrefix={`case-studies/${idPrefix}/progress`}
        />
      </FormSection>

      <FormSection title="Client">
        <TextField name="client_name" label="Client name" defaultValue={cs?.client_name} />
        <TextAreaField name="client_feedback" label="Client feedback" defaultValue={cs?.client_feedback} />
      </FormSection>

      <FormSection title="Team, Services & Tools">
        <CheckboxGroup name="service_ids" label="Services" options={services} selectedIds={selectedServiceIds} />
        <CheckboxGroup name="tool_ids" label="Tools" options={tools} selectedIds={selectedToolIds} />
        <CheckboxGroup
          name="team_involvement_ids"
          label="Team Involvement"
          options={teamInvolvementTypes}
          selectedIds={selectedTeamIds}
        />
      </FormSection>

      <FormSection title="Key Features Delivered">
        <KeyFeaturesRepeater
          defaultValues={keyFeatures}
          pathPrefix={`case-studies/${idPrefix}/features`}
        />
      </FormSection>

      <FormSection title="What Was Built">
        <WebArchitectureRepeater
          defaultValues={webArchitecture}
          pathPrefix={`case-studies/${idPrefix}/web-architecture`}
        />
      </FormSection>

      <FormSection title="SEO">
        <TextField name="seo_title" label="SEO title" defaultValue={cs?.seo_title} />
        <TextAreaField name="seo_description" label="SEO description" defaultValue={cs?.seo_description} />
        <ImageUploadField
          name="seo_image_url"
          label="SEO image"
          defaultValue={cs?.seo_image_url}
          pathPrefix={`case-studies/${idPrefix}`}
        />
      </FormSection>

      <button
        type="submit"
        className="bg-brand-gradient self-start rounded-full px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        {cs ? "Save changes" : "Create case study"}
      </button>
    </form>
  );
}
