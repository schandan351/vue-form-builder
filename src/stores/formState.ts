import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {ComponentType, type FormComponent, type FormState, type FormStore} from '@/types';

export const useFormStore = defineStore('form', (): FormStore => {
    const form = ref<FormState>({
        title: 'New Lead Form',
        components: []
    });

    const addComponent = (component: Omit<FormComponent, 'id'>) => {
        const newComponent = {
            ...component,
            id: crypto.randomUUID()
        };
        form.value.components.push(newComponent);
    };

    const removeComponent = (id: string) => {
        form.value.components = form.value.components.filter(c => c.id !== id);
    };

    const updateTitle = (title: string) => {
        form.value.title = title;
    };

    const updateComponentOrder = (components: FormComponent[]) => {
        form.value.components = components;
    };

    const hasComponents = computed(() => form.value.components.length > 0);

    const defaultComponentGroups = ref<FormState[]>([
        {
            title: 'Components',
            components: [
                {type: ComponentType.ShortText, label: 'Short Text', icon: 'input-text'},
                {type: ComponentType.LongText, label: 'Long Text', icon: 'textarea'},
                {type: ComponentType.Heading, label: 'Heading', icon: 'heading'},
                {type: ComponentType.Paragraph, label: 'Paragraph', icon: 'paragraph'},
                {type: ComponentType.Name, label: 'Name', icon: 'user'},
                {type: ComponentType.Email, label: 'Email', icon: 'mail'},
                {type: ComponentType.Phone, label: 'Phone', icon: 'phone'},
                {type: ComponentType.Address, label: 'Address', icon: 'map-pin'},
                {type: ComponentType.Link, label: 'Link', icon: 'link'},
                {type: ComponentType.List, label: 'List', icon: 'list'},
                {type: ComponentType.RadioGroup, label: 'Radio Group', icon: 'radio'},
                {type: ComponentType.CheckboxGroup, label: 'Checkbox Group', icon: 'checkbox-group'},
                {type: ComponentType.Dropdown, label: 'Dropdown', icon: 'dropdown'},
                {type: ComponentType.Checkbox, label: 'Checkbox', icon: 'checkbox'},
                {type: ComponentType.Date, label: 'Date', icon: 'calendar'},
                {type: ComponentType.Time, label: 'Time', icon: 'clock'},
                {type: ComponentType.Number, label: 'Number', icon: 'hash'},
                {type: ComponentType.Upload, label: 'Upload', icon: 'upload'},
                {type: ComponentType.Website, label: 'Website', icon: 'globe'},
                {type: ComponentType.Rating, label: 'Rating', icon: 'star'},
                {type: ComponentType.VerifyHuman, label: 'Verify Human', icon: 'shield'},
                {type: ComponentType.Location, label: 'Location', icon: 'map-pin'}
            ]
        },
        {
            title: 'Layout Blocks',
            components: [
                {type: ComponentType.Image, label: 'Image', icon: 'image'},
                {type: ComponentType.PageBreak, label: 'Page Break', icon: 'page-break'},
                {type: ComponentType.Sections, label: 'Sections', icon: 'layout'}
            ]
        }
    ]);

    const searchQuery = ref('');
    const filteredComponentGroups = computed(() => {
        return defaultComponentGroups.value.map(group => {
            return {
                title: group.title,
                components: group.components.filter(component => {
                    return component.label.toLowerCase().includes(searchQuery.value.toLowerCase());
                })
            };
        });
    });

    return {
        form,
        addComponent,
        removeComponent,
        updateTitle,
        updateComponentOrder,
        hasComponents,
        defaultComponentGroups,
        filteredComponentGroups,
        searchQuery
    };
});