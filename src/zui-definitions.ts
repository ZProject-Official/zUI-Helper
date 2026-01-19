export interface ZUIMethod {
    label: string;
    detail: string;
    documentation: string;
    example?: string;
    parameters: { label: string; documentation: string }[];
}

export const zuiMethods: ZUIMethod[] = [
    {
        label: 'CreateMenu',
        detail: 'CreateMenu(title, subtitle, description, theme, banner, key, mapping)',
        documentation: 'Crée un nouveau menu principal.',
        example: 'local monMenu = zUI.CreateMenu(\n    "Titre",\n    "Sous-titre",\n    "Description",\n    "default",\n    "banner_url",\n    "F5",\n    "Mapping desc"\n)',
        parameters: [
            { label: 'title', documentation: 'Titre du menu (string|nil)' },
            { label: 'subtitle', documentation: 'Sous-titre (string|nil)' },
            { label: 'description', documentation: 'Description du menu (string|nil)' },
            { label: 'theme', documentation: 'Thème à utiliser "default" (string)' },
            { label: 'banner', documentation: 'URL de la bannière (string|nil)' },
            { label: 'key', documentation: 'Touche d\'ouverture "F5" (string|nil)' },
            { label: 'mapping', documentation: 'Description du mapping (string|nil)' }
        ]
    },
    {
        label: 'CreateSubMenu',
        detail: 'CreateSubMenu(parent, title, subtitle, description)',
        documentation: 'Crée un sous-menu lié à un parent.',
        example: 'local subMenu = zUI.CreateSubMenu(mainMenu, "Titre", "Sous-titre", "Desc")',
        parameters: [
            { label: 'parent', documentation: 'Menu parent (menuId)' },
            { label: 'title', documentation: 'Titre du sous-menu (string|nil)' },
            { label: 'subtitle', documentation: 'Sous-titre (string|nil)' },
            { label: 'description', documentation: 'Description (string|nil)' }
        ]
    },
    {
        label: 'SetItems',
        detail: 'SetItems(menu, callback)',
        documentation: 'Définit les éléments contenus dans le menu via une callback.',
        example: 'zUI.SetItems(menu, function()\n    zUI.Button(...)\nend)',
        parameters: [
            { label: 'menu', documentation: 'Le menu cible (menuId)' },
            { label: 'callback', documentation: 'Fonction contenant les éléments (function)' }
        ]
    },
    {
        label: 'Button',
        detail: 'Button(label, description, styles, action, submenu)',
        documentation: 'Ajoute un bouton simple au menu.',
        example: 'zUI.Button("Label", "Desc", { IsDisabled = false }, function(onSelected)\n    if onSelected then print("Click") end\nend)',
        parameters: [
            { label: 'label', documentation: 'Texte du bouton (string)' },
            { label: 'description', documentation: 'Description (string|nil)' },
            { label: 'styles', documentation: 'Options: { IsDisabled, RightLabel, RightBadge, LeftBadge } (table)' },
            { label: 'action', documentation: 'Callback: function(onSelected) (function)' },
            { label: 'submenu', documentation: 'ID du sous-menu à ouvrir (string|nil)' }
        ]
    },
    {
        label: 'Checkbox',
        detail: 'Checkbox(label, description, state, styles, action)',
        documentation: 'Ajoute une case à cocher.',
        example: 'zUI.Checkbox("Label", "Desc", true, {}, function(onSelected)\n    -- Toggle logic\nend)',
        parameters: [
            { label: 'label', documentation: 'Texte (string)' },
            { label: 'description', documentation: 'Description (string|nil)' },
            { label: 'state', documentation: 'État initial (boolean)' },
            { label: 'styles', documentation: 'Options de style (table)' },
            { label: 'action', documentation: 'Callback: function(onSelected) (function)' }
        ]
    },
    {
        label: 'List',
        detail: 'List(label, description, items, index, styles, action)',
        documentation: 'Ajoute une liste déroulante.',
        example: 'zUI.List("Label", "Desc", {"A", "B"}, 1, {}, function(onSelected, onChange, index)\n    -- Logic\nend)',
        parameters: [
            { label: 'label', documentation: 'Titre (string)' },
            { label: 'description', documentation: 'Description (string)' },
            { label: 'items', documentation: 'Tableau des éléments (table)' },
            { label: 'index', documentation: 'Index sélectionné (number)' },
            { label: 'styles', documentation: 'Options de style (table)' },
            { label: 'action', documentation: 'Callback: function(onSelected, onChange, index) (function)' }
        ]
    },
    {
        label: 'Slider',
        detail: 'Slider(label, description, percentage, step, styles, action)',
        documentation: 'Ajoute un curseur de progression (0-100).',
        example: 'zUI.Slider("Volume", "Desc", 50, 5, { ShowPercentage = true }, function(onSelected, onChange, pct)\n    -- Logic\nend)',
        parameters: [
            { label: 'label', documentation: 'Titre (string)' },
            { label: 'description', documentation: 'Description (string)' },
            { label: 'percentage', documentation: 'Valeur 0-100 (number)' },
            { label: 'step', documentation: 'Pas d\'incrémentation (number)' },
            { label: 'styles', documentation: 'Options: { ShowPercentage: true } (table)' },
            { label: 'action', documentation: 'Callback: function(onSelected, onChange, percentage) (function)' }
        ]
    },
    {
        label: 'ColorPicker',
        detail: 'ColorPicker(label, description, value, styles, action)',
        documentation: 'Ajoute un sélecteur de couleur.',
        example: 'zUI.ColorPicker("Couleur", "Desc", "#FF0000", {}, function(onChange, value)\n    -- Logic\nend)',
        parameters: [
            { label: 'label', documentation: 'Titre (string)' },
            { label: 'description', documentation: 'Description (string)' },
            { label: 'value', documentation: 'Couleur Hex "#RRGGBB" (string)' },
            { label: 'styles', documentation: 'Options de style (table)' },
            { label: 'action', documentation: 'Callback: function(onChange, value) (function)' }
        ]
    },
    {
        label: 'ColorsList',
        detail: 'ColorsList(label, description, colors, index, styles, action)',
        documentation: 'Ajoute une liste de couleurs prédéfinies.',
        example: 'zUI.ColorsList("Liste", "Desc", {"#FFF", "#000"}, 1, {}, function(onSel, onChg, idx)\n    -- Logic\nend)',
        parameters: [
            { label: 'label', documentation: 'Titre (string)' },
            { label: 'description', documentation: 'Description (string)' },
            { label: 'colors', documentation: 'Tableau de couleurs Hex (table)' },
            { label: 'index', documentation: 'Index sélectionné (number)' },
            { label: 'styles', documentation: 'Options de style (table)' },
            { label: 'action', documentation: 'Callback: function(onSelected, onChange, index) (function)' }
        ]
    },
    {
        label: 'TextArea',
        detail: 'TextArea(label, description, value, placeholder, styles, action)',
        documentation: 'Ajoute une zone de saisie de texte.',
        example: 'zUI.TextArea("Input", "Desc", "", "Placeholder", {}, function(onChange, val)\n    -- Logic\nend)',
        parameters: [
            { label: 'label', documentation: 'Titre (string)' },
            { label: 'description', documentation: 'Description (string)' },
            { label: 'value', documentation: 'Valeur initiale (string)' },
            { label: 'placeholder', documentation: 'Texte fantôme (string)' },
            { label: 'styles', documentation: 'Options de style (table)' },
            { label: 'action', documentation: 'Callback: function(onChange, value) (function)' }
        ]
    },
    {
        label: 'SearchBar',
        detail: 'SearchBar(label, description, value, placeholder, styles, action)',
        documentation: 'Ajoute une barre de recherche spécifique.',
        parameters: [
            { label: 'label', documentation: 'Titre (string)' },
            { label: 'description', documentation: 'Description (string)' },
            { label: 'value', documentation: 'Valeur initiale (string)' },
            { label: 'placeholder', documentation: 'Texte fantôme (string)' },
            { label: 'styles', documentation: 'Options de style (table)' },
            { label: 'action', documentation: 'Callback: function(onChange, value) (function)' }
        ]
    },
    {
        label: 'LinkButton',
        detail: 'LinkButton(label, description, link, styles)',
        documentation: 'Ajoute un bouton ouvrant un lien externe.',
        example: 'zUI.LinkButton("Wiki", "Ouvrir", "https://...", {})',
        parameters: [
            { label: 'label', documentation: 'Titre (string)' },
            { label: 'description', documentation: 'Description (string)' },
            { label: 'link', documentation: 'URL (string)' },
            { label: 'styles', documentation: 'Options de style (table)' }
        ]
    },
    {
        label: 'Line',
        detail: 'Line(colors)',
        documentation: 'Ajoute une ligne de séparation décorative.',
        example: 'zUI.Line({"#FF0000", "#00FF00"})',
        parameters: [
            { label: 'colors', documentation: 'Tableau de couleurs pour dégradé (table|nil)' }
        ]
    },
    {
        label: 'Separator',
        detail: 'Separator(label, position)',
        documentation: 'Ajoute un séparateur de section avec texte.',
        example: 'zUI.Separator("CATEGORY", "center")',
        parameters: [
            { label: 'label', documentation: 'Texte (string)' },
            { label: 'position', documentation: '"left", "center", "right" (string)' }
        ]
    },
    {
        label: 'SetVisible',
        detail: 'SetVisible(menuId, visible)',
        documentation: 'Modifie la visibilité d\'un menu.',
        parameters: [
            { label: 'menuId', documentation: 'Le menu cible' },
            { label: 'visible', documentation: 'true pour afficher, false pour cacher (boolean)' }
        ]
    },
    {
        label: 'IsVisible',
        detail: 'IsVisible(menuId)',
        documentation: 'Vérifie si un menu est actuellement visible.',
        parameters: [
            { label: 'menuId', documentation: 'Le menu cible' }
        ]
    },
    {
        label: 'CloseAll',
        detail: 'CloseAll()',
        documentation: 'Ferme tous les menus ouverts.',
        parameters: []
    },
    {
        label: 'Goback',
        detail: 'Goback()',
        documentation: 'Retourne au menu parent ou précédent.',
        parameters: []
    },
    {
        label: 'Goto',
        detail: 'Goto(menuId)',
        documentation: 'Force la navigation vers un menu spécifique.',
        parameters: [
            { label: 'menuId', documentation: 'Le menu cible' }
        ]
    },
    {
        label: 'ShowInfoBox',
        detail: 'ShowInfoBox(title, description, theme, items)',
        documentation: 'Affiche une boîte d\'information flottante.',
        example: 'zUI.ShowInfoBox("Titre", "Desc", "default", { { type="text", title="Lbl", value="Val" } })',
        parameters: [
            { label: 'title', documentation: 'Titre (string)' },
            { label: 'description', documentation: 'Description (string)' },
            { label: 'theme', documentation: 'Thème (string)' },
            { label: 'items', documentation: 'Liste des infos [{type, title, value}] (table)' }
        ]
    },
    { label: 'SetTitle', detail: 'SetTitle(menuId, title)', documentation: 'Change le titre.', parameters: [{ label: 'menuId', documentation: '' }, { label: 'title', documentation: '' }] },
    { label: 'SetSubtitle', detail: 'SetSubtitle(menuId, subtitle)', documentation: 'Change le sous-titre.', parameters: [{ label: 'menuId', documentation: '' }, { label: 'subtitle', documentation: '' }] },
    { label: 'SetDescription', detail: 'SetDescription(menuId, description)', documentation: 'Change la description.', parameters: [{ label: 'menuId', documentation: '' }, { label: 'description', documentation: '' }] },
    { label: 'SetIsClosable', detail: 'SetIsClosable(menuId, closable)', documentation: 'Définit si le menu peut être fermé manuellement.', parameters: [{ label: 'menuId', documentation: '' }, { label: 'closable', documentation: 'boolean' }] },
    { label: 'SetOpenHandler', detail: 'SetOpenHandler(menuId, handler)', documentation: 'Définit une fonction déclenchée à l\'ouverture.', parameters: [{ label: 'menuId', documentation: '' }, { label: 'handler', documentation: 'function' }] },
    { label: 'SetCloseHandler', detail: 'SetCloseHandler(menuId, handler)', documentation: 'Définit une fonction déclenchée à la fermeture.', parameters: [{ label: 'menuId', documentation: '' }, { label: 'handler', documentation: 'function' }] },
    { label: 'GetHoveredItem', detail: 'GetHoveredItem()', documentation: 'Retourne l\'élément actuellement survolé.', parameters: [] }
];
