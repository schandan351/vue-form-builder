import type {Component, Ref} from "vue";

export interface FormComponent {
    id: string;
    type: ComponentType;
    label: string;
    icon: string;
    properties?: Record<string, any>;
}

export enum ComponentType {
    ShortText = 'shortText',
    LongText = 'longText',
    Heading = 'heading',
    Paragraph = 'paragraph',
    Name = 'name',
    Email = 'email',
    Phone = 'phone',
    Address = 'address',
    Link = 'link',
    List = 'list',
    RadioGroup = 'radioGroup',
    CheckboxGroup = 'checkboxGroup',
    Dropdown = 'dropdown',
    Checkbox = 'checkbox',
    Date = 'date',
    Time = 'time',
    Number = 'number',
    Upload = 'upload',
    Website = 'website',
    Rating = 'rating',
    VerifyHuman = 'verifyHuman',
    Location = 'location',
    Image = 'image',
    PageBreak = 'pageBreak',
    Sections = 'sections'
}

export interface FormState {
    title: string;
    components: FormComponent[];
}

export interface FormStore {
    form: Ref<FormState>;
    addComponent: (component: Omit<FormComponent, 'id'>) => void;
    removeComponent: (id: string) => void;
    updateTitle: (title: string) => void;
    updateComponentOrder: (components: FormComponent[]) => void;
    hasComponents: Ref<boolean>;
}