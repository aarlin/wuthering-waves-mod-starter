"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapSubMapItem = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../Util/LguiUtil");
class WorldMapSubMapItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.MultiMapConfigId = 0),
			(this.OnToggleStateChange = (e) => {
				1 === e &&
					(EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.WorldMapSelectMultiMap,
						this.MultiMapConfigId,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.WorldMapSubMapChanged,
						this.GridIndex,
					));
			});
	}
	Refresh(e, t, i) {
		if (
			((this.MultiMapConfigId = e.Id),
			(this.GridIndex = i),
			this.GetExtendToggle(3)?.SetToggleState(t ? 1 : 0, !1),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.FloorName),
			(i = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
			(t = ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByAreaId(i)),
			e.Area.includes(i) || (!e.Area.includes(i) && 0 === e.Floor && !t))
		) {
			if (
				((i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_MultiMapCurrentAreaIcon",
				)),
				!StringUtils_1.StringUtils.IsEmpty(i))
			) {
				const e = this.GetSprite(0)
					?.GetOwner()
					?.GetComponentByClass(
						UE.UIExtendToggleSpriteTransition.StaticClass(),
					);
				ResourceSystem_1.ResourceSystem.LoadAsync(
					i,
					UE.LGUISpriteData_BaseObject,
					(t) => {
						t && e && e.SetAllStateSprite(t);
					},
				),
					this.SetSpriteByPath(i, this.GetSprite(1), !1);
			}
		} else if (
			!StringUtils_1.StringUtils.IsEmpty(e.FloorIcon) &&
			((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				e.FloorIcon,
			)),
			!StringUtils_1.StringUtils.IsEmpty(t))
		) {
			const e = this.GetSprite(0)
				?.GetOwner()
				?.GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass());
			ResourceSystem_1.ResourceSystem.LoadAsync(
				t,
				UE.LGUISpriteData_BaseObject,
				(t) => {
					t && e && e.SetAllStateSprite(t);
				},
			),
				this.SetSpriteByPath(t, this.GetSprite(1), !1);
		}
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIExtendToggle],
		];
	}
	OnStart() {
		this.GetExtendToggle(3)?.OnStateChange.Add(this.OnToggleStateChange);
	}
	OnSelected(e) {
		this.GetExtendToggle(3)?.SetToggleState(1, e);
	}
	OnDeselected(e) {
		this.GetExtendToggle(3)?.SetToggleState(0, e);
	}
}
exports.WorldMapSubMapItem = WorldMapSubMapItem;
