import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {ComponentType, type FormComponent, type FormState, type FormStore, type ComponentSettings} from '@/types';

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
                {type: ComponentType.ShortText, label: 'Short Text', icon: 'input-text', id: crypto.randomUUID()},
                {type: ComponentType.LongText, label: 'Long Text', icon: 'textarea', id: crypto.randomUUID()},
                {type: ComponentType.Heading, label: 'Heading', icon: 'heading', id: crypto.randomUUID()},
                {type: ComponentType.Paragraph, label: 'Paragraph', icon: 'paragraph', id: crypto.randomUUID()},
                {type: ComponentType.Name, label: 'Name', icon: 'user', id: crypto.randomUUID()},
                {
                    type: ComponentType.Email, label: 'Email', icon: 'mail', id: crypto.randomUUID(), properties: {
                        placeholder: '',
                        mandatory: false,
                        width: 'full',
                    }
                },
                {type: ComponentType.Phone, label: 'Phone', icon: 'phone', id: crypto.randomUUID()},
                {type: ComponentType.Address, label: 'Address', icon: 'map-pin', id: crypto.randomUUID()},
                {type: ComponentType.Link, label: 'Link', icon: 'link', id: crypto.randomUUID()},
                {type: ComponentType.List, label: 'List', icon: 'list', id: crypto.randomUUID()},
                {type: ComponentType.RadioGroup, label: 'Radio Group', icon: 'radio', id: crypto.randomUUID()},
                {
                    type: ComponentType.CheckboxGroup,
                    label: 'Checkbox Group',
                    icon: 'checkbox-group',
                    id: crypto.randomUUID()
                },
                {type: ComponentType.Dropdown, label: 'Dropdown', icon: 'dropdown', id: crypto.randomUUID()},
                {type: ComponentType.Checkbox, label: 'Checkbox', icon: 'checkbox', id: crypto.randomUUID()},
                {type: ComponentType.Date, label: 'Date', icon: 'calendar', id: crypto.randomUUID()},
                {type: ComponentType.Time, label: 'Time', icon: 'clock', id: crypto.randomUUID()},
                {type: ComponentType.Number, label: 'Number', icon: 'hash', id: crypto.randomUUID()},
                {type: ComponentType.Upload, label: 'Upload', icon: 'upload', id: crypto.randomUUID()},
                {type: ComponentType.Website, label: 'Website', icon: 'globe', id: crypto.randomUUID()},
                {type: ComponentType.Rating, label: 'Rating', icon: 'star', id: crypto.randomUUID()},
                {type: ComponentType.VerifyHuman, label: 'Verify Human', icon: 'shield', id: crypto.randomUUID()},
                {type: ComponentType.Location, label: 'Location', icon: 'map-pin', id: crypto.randomUUID()}
            ]
        },
        {
            title: 'Layout Blocks',
            components: [
                {type: ComponentType.Image, label: 'Image', icon: 'image', id: crypto.randomUUID()},
                {type: ComponentType.PageBreak, label: 'Page Break', icon: 'page-break', id: crypto.randomUUID()},
                {type: ComponentType.Sections, label: 'Sections', icon: 'layout', id: crypto.randomUUID()},
                {type: ComponentType.Grid, label: 'Grid', icon: 'layout', id: crypto.randomUUID()}
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

    const activeComponent = ref<string | null>(null);

    const setActiveComponent = (id: string) => {
        activeComponent.value = id;
        const component = form.value.components.find(c => c.id === id);
        if (component) {
            componentSettings.value = {
                label: component.label,
                placeholder: component.properties?.placeholder || '',
                mandatory: component.properties?.mandatory || false,
                width: component.properties?.width || 'full',
                columns: component.properties?.columns || null
            };
        }
    };

    const clearActiveComponent = (event: MouseEvent) => {
        // if (!(event.target as HTMLElement).closest('.form-component')) {
        //     activeComponent.value = null;
        // }
    };

    const componentSettings = ref<ComponentSettings>({
        label: '',
        placeholder: '',
        mandatory: false,
        width: 'full',
        columns: null
    });

    const updateComponentSettings = () => {
        if (activeComponent) {
            const component = form.value.components.find(c => c.id === activeComponent.value);
            if (component) {
                component.label = componentSettings.value.label;
                component.properties = {
                    ...component.properties,
                    placeholder: componentSettings.value.placeholder,
                    mandatory: componentSettings.value.mandatory,
                    width: componentSettings.value.width,
                    columns: componentSettings.value.columns
                };
            }
        }
    };

    return {
        form,
        addComponent,
        removeComponent,
        updateTitle,
        updateComponentOrder,
        hasComponents,
        defaultComponentGroups,
        filteredComponentGroups,
        searchQuery,
        activeComponent,
        setActiveComponent,
        clearActiveComponent,
        componentSettings,
        updateComponentSettings
    };
});