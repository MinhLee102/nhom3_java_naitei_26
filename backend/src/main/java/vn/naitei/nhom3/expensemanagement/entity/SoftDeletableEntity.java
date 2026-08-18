package vn.naitei.nhom3.expensemanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public abstract class SoftDeletableEntity extends AuditableEntity {

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
