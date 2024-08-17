"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerHeadItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class PlayerHeadItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	RefreshByPlayerId(e, r = !1) {
		this.QMt(e, r);
	}
	QMt(e, r = !1) {
		var a = ModelManager_1.ModelManager.PlayerInfoModel,
			t = this.GetTexture(0);
		if (a.GetId() === e)
			return r
				? ((a = ModelManager_1.ModelManager.PlayerInfoModel.GetHeadIconId()),
					void this.RefreshByRoleIdUseCard(a))
				: ((a =
						ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerHeadIconBig()),
					void (
						StringUtils_1.StringUtils.IsEmpty(a) || this.SetTextureByPath(a, t)
					));
		(a = ModelManager_1.ModelManager.FriendModel.GetFriendById(e)) &&
			((t = a.PlayerHeadPhoto),
			r ? this.RefreshByRoleIdUseCard(t) : this.RefreshByHeadPhotoId(t));
	}
	RefreshByHeadPhotoId(e) {
		this.RefreshByRoleId(e);
	}
	RefreshByRoleId(e) {
		var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleHeadIcon(e),
			a = this.GetTexture(0);
		this.SetRoleIcon(r, a, e);
	}
	RefreshByRoleIdUseCard(e) {
		var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).Card,
			a = this.GetTexture(0);
		this.SetRoleIcon(r, a, e);
	}
	SetIsGray(e) {
		this.GetTexture(0).SetIsGray(e);
	}
}
exports.PlayerHeadItem = PlayerHeadItem;
