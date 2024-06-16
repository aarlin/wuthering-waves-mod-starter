"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeleportMarkItem = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	TeleportMarkItemView_1 = require("../MarkItemView/TeleportMarkItemView"),
	ConfigMarkItem_1 = require("./ConfigMarkItem");
class TeleportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
	constructor(e, t, r, i, n, s = 1) {
		super(e, t, r, i, n, s),
			(this.xTi = (e) => {
				this.MarkConfig.MarkId === e &&
					(this.PTi(), this.View?.OnIconPathChanged(this.IconPath));
			});
	}
	get IsFogUnlock() {
		return (
			(6 === this.MarkConfig.ObjectType && !this.IsLocked) || super.IsFogUnlock
		);
	}
	get IsLocked() {
		return !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(
			this.MarkConfig.MarkId,
		);
	}
	Initialize() {
		super.Initialize(), this.PTi(), this.AddEventListener();
	}
	OnCreateView() {
		this.InnerView = new TeleportMarkItemView_1.TeleportMarkItemView(this);
	}
	OnDestroy() {
		super.OnDestroy(), this.RemoveEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UnlockTeleport,
			this.xTi,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UnlockTeleport,
			this.xTi,
		);
	}
	ViewUpdate(e, t = !1, r = !1) {
		super.ViewUpdate(e, t, r);
	}
	PTi() {
		this.IconPath = this.IsLocked
			? this.MarkConfig.LockMarkPic
			: this.MarkConfig.UnlockMarkPic;
	}
	get IsActivity() {
		return 13 === this.MarkConfig.ObjectType;
	}
	get IsDungeonEntrance() {
		return (
			2 === this.MarkConfig.RelativeType ||
			ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdLinkDungeonEntrance(
				this.MarkConfigId,
			)
		);
	}
	get IsTowerEntrance() {
		return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsTowerEntrance(
			this.MarkConfigId,
		);
	}
	get IsRoguelike() {
		return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsRoguelike(
			this.MarkConfigId,
		);
	}
}
exports.TeleportMarkItem = TeleportMarkItem;
//# sourceMappingURL=TeleportMarkItem.js.map
